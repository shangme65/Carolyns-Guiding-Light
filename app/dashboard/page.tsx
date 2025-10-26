"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  CheckCircle,
  Loader2,
  AlertCircle,
  X,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalFilter, setModalFilter] = useState<
    "all" | "confirmed" | "pending"
  >("all");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    } else if (status === "authenticated") {
      fetchAppointments();
    }
  }, [status, router]);

  const fetchAppointments = async () => {
    try {
      const response = await fetch("/api/appointments");
      if (response.ok) {
        const data = await response.json();
        setAppointments(data);
      }
    } catch (error) {
      console.error("Failed to fetch appointments:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const cancelAppointment = async (id: string) => {
    if (!confirm("Are you sure you want to cancel this appointment?")) {
      return;
    }

    try {
      const response = await fetch("/api/appointments", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: "CANCELLED" }),
      });

      if (response.ok) {
        const updatedAppointment = await response.json();
        setAppointments((prev) =>
          prev.map((apt: any) =>
            apt.id === id ? { ...apt, status: updatedAppointment.status } : apt
          )
        );
      }
    } catch (error) {
      console.error("Failed to cancel appointment:", error);
    }
  };

  const updateAppointmentStatus = async (id: string, status: string) => {
    try {
      const response = await fetch("/api/appointments", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });

      if (response.ok) {
        const updatedAppointment = await response.json();
        setAppointments((prev) =>
          prev.map((apt: any) =>
            apt.id === id
              ? { ...apt, status: updatedAppointment.status.toLowerCase() }
              : apt
          )
        );
      }
    } catch (error) {
      console.error("Failed to update appointment:", error);
    }
  };

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black flex items-center justify-center">
        <Loader2 className="h-12 w-12 text-purple-400 animate-spin" />
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "text-green-400 bg-green-500/20";
      case "pending":
        return "text-yellow-400 bg-yellow-500/20";
      case "cancelled":
        return "text-red-400 bg-red-500/20";
      default:
        return "text-gray-400 bg-gray-500/20";
    }
  };

  const isAdmin = session?.user?.role?.toLowerCase() === "admin";

  const openModal = (filter: "all" | "confirmed" | "pending") => {
    setModalFilter(filter);
    setModalOpen(true);
  };

  const getFilteredAppointments = () => {
    if (modalFilter === "all") return appointments;
    return appointments.filter((apt: any) => apt.status === modalFilter);
  };

  console.log("Session data:", session);
  console.log("User role:", session?.user?.role);
  console.log("Is admin:", isAdmin);
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black pt-20 md:pt-28 pb-12 md:pb-16 px-3 md:px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 md:mb-12"
        >
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-3 md:mb-4">
            Welcome, {session?.user?.name || "Carolyn"} {isAdmin}
          </h1>
          <p className="text-base md:text-xl text-white/70">
            Your spiritual journey dashboard
          </p>
        </motion.div>

        {isAdmin && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-6 md:mb-8"
          >
            <Card className="bg-gradient-to-r from-purple-600 to-indigo-600 border-0 shadow-2xl">
              <CardContent className="p-5 md:p-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h2 className="text-lg md:text-2xl font-bold text-white mb-1 md:mb-2">
                      Appointment Management
                    </h2>
                    <p className="text-sm md:text-base text-white/80">
                      View and manage all client appointments
                    </p>
                  </div>
                  <button
                    onClick={() => router.push("/admin/appointments")}
                    className="px-6 md:px-8 py-3 md:py-4 bg-white text-purple-600 rounded-lg hover:bg-gray-100 transition-all font-bold text-sm md:text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    View Appointments →
                  </button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card
              className="bg-white/10 backdrop-blur-lg border-white/20 cursor-pointer hover:bg-white/20 transition-all"
              onClick={() => openModal("all")}
            >
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-white text-base md:text-xl">
                    <Calendar className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                    Total Appointments
                  </div>
                  <p className="text-2xl md:text-4xl font-bold text-purple-400">
                    {appointments.length}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card
              className="bg-white/10 backdrop-blur-lg border-white/20 cursor-pointer hover:bg-white/20 transition-all"
              onClick={() => openModal("confirmed")}
            >
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-white text-base md:text-xl">
                    <CheckCircle className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                    Confirmed
                  </div>
                  <p className="text-2xl md:text-4xl font-bold text-green-400">
                    {
                      appointments.filter(
                        (apt: any) => apt.status === "confirmed"
                      ).length
                    }
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card
              className="bg-white/10 backdrop-blur-lg border-white/20 cursor-pointer hover:bg-white/20 transition-all"
              onClick={() => openModal("pending")}
            >
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-white text-base md:text-xl">
                    <AlertCircle className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                    Pending
                  </div>
                  <p className="text-2xl md:text-4xl font-bold text-yellow-400">
                    {
                      appointments.filter(
                        (apt: any) => apt.status === "pending"
                      ).length
                    }
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardHeader>
              <CardTitle className="text-lg md:text-2xl text-white">
                {isAdmin ? "Recent Appointments" : "Your Appointments"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {appointments.length === 0 ? (
                <div className="text-center py-8 md:py-12">
                  <Calendar className="h-12 w-12 md:h-16 md:w-16 text-white/30 mx-auto mb-3 md:mb-4" />
                  <p className="text-white/70 text-base md:text-lg mb-4 md:mb-6">
                    {isAdmin
                      ? "No appointments in the system yet"
                      : "No appointments yet"}
                  </p>
                  {!isAdmin && (
                    <a
                      href="/appointments"
                      className="inline-flex items-center px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all text-sm md:text-base"
                    >
                      Book Your First Session
                    </a>
                  )}
                </div>
              ) : (
                <div className="space-y-3 md:space-y-4">
                  {appointments
                    .slice(0, isAdmin ? 5 : appointments.length)
                    .map((appointment: any, index: number) => (
                      <motion.div
                        key={appointment.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 md:p-6 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all"
                      >
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span
                                className={`px-2 md:px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                                  appointment.status
                                )}`}
                              >
                                {appointment.status.charAt(0).toUpperCase() +
                                  appointment.status.slice(1)}
                              </span>
                              <span className="px-2 md:px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-400">
                                {appointment.type.charAt(0).toUpperCase() +
                                  appointment.type.slice(1)}
                              </span>
                            </div>
                            {isAdmin && appointment.user && (
                              <div className="text-white/80 text-xs md:text-sm mb-2 font-semibold">
                                Client:{" "}
                                {appointment.user.name ||
                                  appointment.user.email}
                              </div>
                            )}
                            <div className="flex items-center text-white/70 text-xs md:text-sm mb-1 md:mb-2">
                              <Calendar className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                              {formatDate(appointment.date)}
                            </div>
                            <div className="flex items-center text-white/70 text-xs md:text-sm">
                              <Clock className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                              {appointment.time}
                            </div>
                            {appointment.notes && (
                              <p className="text-white/60 text-xs md:text-sm mt-2 md:mt-3 italic">
                                Note: {appointment.notes}
                              </p>
                            )}
                          </div>
                          {!isAdmin &&
                            appointment.status.toLowerCase() === "pending" && (
                              <div className="ml-0 md:ml-4">
                                <button
                                  onClick={() =>
                                    cancelAppointment(appointment.id)
                                  }
                                  className="px-3 md:px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-all text-xs md:text-base"
                                >
                                  Cancel
                                </button>
                              </div>
                            )}
                        </div>
                      </motion.div>
                    ))}
                  {isAdmin && appointments.length > 5 && (
                    <div className="text-center pt-3 md:pt-4">
                      <a
                        href="/admin/appointments"
                        className="text-purple-400 hover:text-purple-300 font-semibold text-sm md:text-base"
                      >
                        View all {appointments.length} appointments →
                      </a>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setModalOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-gradient-to-br from-purple-900 via-indigo-900 to-black border border-white/20 rounded-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
                {modalFilter === "all" && (
                  <Calendar className="h-6 w-6 md:h-8 md:w-8 text-purple-400" />
                )}
                {modalFilter === "confirmed" && (
                  <CheckCircle className="h-6 w-6 md:h-8 md:w-8 text-green-400" />
                )}
                {modalFilter === "pending" && (
                  <AlertCircle className="h-6 w-6 md:h-8 md:w-8 text-yellow-400" />
                )}
                {modalFilter === "all"
                  ? "All Appointments"
                  : modalFilter === "confirmed"
                  ? "Confirmed Appointments"
                  : "Pending Appointments"}
                <span className="text-lg md:text-xl text-white/60">
                  ({getFilteredAppointments().length})
                </span>
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-all"
              >
                <X className="h-6 w-6 text-white" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(80vh-100px)]">
              {getFilteredAppointments().length === 0 ? (
                <div className="text-center py-12">
                  <Calendar className="h-16 w-16 text-white/30 mx-auto mb-4" />
                  <p className="text-white/70 text-lg">
                    No {modalFilter === "all" ? "" : modalFilter} appointments
                    found
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {getFilteredAppointments().map((appointment: any) => (
                    <motion.div
                      key={appointment.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 md:p-6 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all"
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-3">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                                appointment.status
                              )}`}
                            >
                              {appointment.status.charAt(0).toUpperCase() +
                                appointment.status.slice(1)}
                            </span>
                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-400">
                              {appointment.type.charAt(0).toUpperCase() +
                                appointment.type.slice(1)}
                            </span>
                          </div>
                          <div className="flex items-center text-white/70 text-sm md:text-base mb-2">
                            <Calendar className="h-4 w-4 mr-2" />
                            {formatDate(appointment.date)}
                          </div>
                          <div className="flex items-center text-white/70 text-sm md:text-base mb-2">
                            <Clock className="h-4 w-4 mr-2" />
                            {appointment.time}
                          </div>
                          {appointment.notes && (
                            <p className="text-white/60 text-sm mt-3 italic border-l-2 border-purple-500/50 pl-3">
                              Note: {appointment.notes}
                            </p>
                          )}
                        </div>
                        {isAdmin ? (
                          <div className="flex gap-2 ml-0 md:ml-4">
                            <button
                              onClick={() =>
                                appointment.status.toLowerCase() ===
                                  "pending" &&
                                updateAppointmentStatus(
                                  appointment.id,
                                  "confirmed"
                                )
                              }
                              disabled={
                                appointment.status.toLowerCase() !== "pending"
                              }
                              className={`px-3 py-1.5 rounded-lg font-semibold text-xs transition-all ${
                                appointment.status.toLowerCase() === "confirmed"
                                  ? "bg-green-500 text-white cursor-default"
                                  : appointment.status.toLowerCase() ===
                                    "cancelled"
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
                                  updateAppointmentStatus(
                                    appointment.id,
                                    "cancelled"
                                  )
                                }
                                className="px-3 py-1.5 rounded-lg font-semibold text-xs transition-all bg-red-600 text-white hover:bg-red-700 cursor-pointer"
                              >
                                Decline
                              </button>
                            ) : appointment.status.toLowerCase() ===
                              "cancelled" ? (
                              <button
                                disabled
                                className="px-3 py-1.5 rounded-lg font-semibold text-xs transition-all bg-red-800 text-white cursor-not-allowed"
                              >
                                Declined
                              </button>
                            ) : null}
                          </div>
                        ) : appointment.status.toLowerCase() === "pending" ? (
                          <div className="ml-0 md:ml-4">
                            <button
                              onClick={() => {
                                cancelAppointment(appointment.id);
                                setModalOpen(false);
                              }}
                              className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-all text-xs w-full md:w-auto"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : null}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
