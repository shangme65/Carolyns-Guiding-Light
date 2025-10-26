"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface Appointment {
  id: string;
  date: string;
  time: string;
  type: string;
  status: string;
  notes: string | null;
  createdAt: string;
  user: {
    name: string | null;
    email: string | null;
  };
}

export default function AdminAppointments() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<
    "all" | "pending" | "confirmed" | "cancelled"
  >("all");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    } else if (session?.user?.role?.toLowerCase() !== "admin") {
      router.push("/");
    }
  }, [session, status, router]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await fetch("/api/appointments");
      if (response.ok) {
        const data = await response.json();
        setAppointments(data);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateAppointmentStatus = async (
    id: string,
    status: "CONFIRMED" | "CANCELLED"
  ) => {
    try {
      const response = await fetch("/api/appointments", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });

      if (response.ok) {
        const updatedAppointment = await response.json();
        // Update local state immediately
        setAppointments((prev) =>
          prev.map((apt) =>
            apt.id === id ? { ...apt, status: updatedAppointment.status } : apt
          )
        );
      }
    } catch (error) {
      console.error("Error updating appointment:", error);
    }
  };

  const filteredAppointments = appointments.filter((apt) => {
    if (filter === "all") return true;
    return apt.status.toLowerCase() === filter.toLowerCase();
  });

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (session?.user?.role?.toLowerCase() !== "admin") {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 py-6 md:py-12 px-2 md:px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-4 md:mb-8">
          <h1 className="text-2xl md:text-4xl font-bold text-white mb-1 md:mb-2">
            All Appointments
          </h1>
          <p className="text-sm md:text-base text-purple-200">
            Sorted by date - Click confirm to approve appointments
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 md:gap-4 mb-4 md:mb-8">
          {(["all", "pending", "confirmed", "cancelled"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 md:px-6 py-1.5 md:py-2 rounded-lg text-sm md:text-base font-semibold transition-all ${
                filter === f
                  ? "bg-white text-purple-900"
                  : "bg-purple-700 text-white hover:bg-purple-600"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
              {f === "all" && ` (${appointments.length})`}
              {f === "pending" &&
                ` (${
                  appointments.filter(
                    (a) => a.status.toLowerCase() === "pending"
                  ).length
                })`}
              {f === "confirmed" &&
                ` (${
                  appointments.filter(
                    (a) => a.status.toLowerCase() === "confirmed"
                  ).length
                })`}
              {f === "cancelled" &&
                ` (${
                  appointments.filter(
                    (a) => a.status.toLowerCase() === "cancelled"
                  ).length
                })`}
            </button>
          ))}
        </div>

        {/* Appointments Grid */}
        <div className="grid gap-6">
          {filteredAppointments.length === 0 ? (
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-12 text-center">
              <p className="text-white text-xl">
                No {filter !== "all" ? filter : ""} appointments found
              </p>
            </div>
          ) : (
            filteredAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="bg-white/10 backdrop-blur-md rounded-xl md:rounded-2xl p-3 md:p-6 border border-white/20 hover:bg-white/15 transition-all"
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3 md:gap-0">
                  <div className="flex-1">
                    <h3 className="text-lg md:text-2xl font-bold text-white mb-2 md:mb-3">
                      {appointment.type}
                    </h3>
                    <div className="space-y-1 md:space-y-2 text-sm md:text-base text-purple-200">
                      <p>
                        <strong>Client:</strong>{" "}
                        {appointment.user.name || "N/A"}
                      </p>
                      <p>
                        <strong>Email:</strong> {appointment.user.email}
                      </p>
                      <p className="text-xs md:text-sm">
                        <strong>Date:</strong>{" "}
                        {new Date(appointment.date).toLocaleDateString(
                          "en-US",
                          {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </p>
                      <p>
                        <strong>Time:</strong> {appointment.time}
                      </p>
                      {appointment.notes && (
                        <p className="mt-1 md:mt-2 text-xs md:text-sm">
                          <strong>Notes:</strong> {appointment.notes}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2 md:gap-3 md:ml-6">
                    <button
                      onClick={() =>
                        appointment.status.toLowerCase() === "pending" &&
                        updateAppointmentStatus(appointment.id, "CONFIRMED")
                      }
                      disabled={appointment.status.toLowerCase() !== "pending"}
                      className={`px-3 md:px-6 py-1 md:py-2 rounded-lg font-semibold text-xs md:text-sm transition-all ${
                        appointment.status.toLowerCase() === "confirmed"
                          ? "bg-green-500 text-white cursor-default"
                          : appointment.status.toLowerCase() === "cancelled"
                          ? "hidden"
                          : "bg-purple-600 text-white hover:bg-purple-700 cursor-pointer"
                      }`}
                    >
                      {appointment.status.toLowerCase() === "confirmed"
                        ? "✓ Confirmed"
                        : "Confirm"}
                    </button>

                    {appointment.status.toLowerCase() === "pending" ? (
                      <button
                        onClick={() =>
                          updateAppointmentStatus(appointment.id, "CANCELLED")
                        }
                        className="px-3 md:px-6 py-1 md:py-2 rounded-lg font-semibold text-xs md:text-sm transition-all bg-red-600 text-white hover:bg-red-700 cursor-pointer"
                      >
                        Decline
                      </button>
                    ) : appointment.status.toLowerCase() === "cancelled" ? (
                      <button
                        disabled
                        className="px-3 md:px-6 py-1 md:py-2 rounded-lg font-semibold text-xs md:text-sm transition-all bg-red-800 text-white cursor-not-allowed"
                      >
                        Declined
                      </button>
                    ) : null}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
