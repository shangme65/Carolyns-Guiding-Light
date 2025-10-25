"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Calendar, Clock, FileText, Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const appointmentTypes = [
  {
    value: "reading",
    label: "Spiritual Reading",
    description: "Deep insights into your life path and purpose",
  },
  {
    value: "consultation",
    label: "Life Consultation",
    description: "Guidance on specific life challenges",
  },
  {
    value: "healing",
    label: "Energy Healing",
    description: "Restore balance and harmony to your energy",
  },
  {
    value: "meditation",
    label: "Guided Meditation",
    description: "Personal meditation session for inner peace",
  },
];

export default function AppointmentsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    type: "",
    notes: "",
  });

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black flex items-center justify-center">
        <Loader2 className="h-12 w-12 text-purple-400 animate-spin" />
      </div>
    );
  }

  if (!session) {
    router.push("/auth/signin");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to book appointment");
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/dashboard");
      }, 3000);
    } catch (error) {
      setError("Failed to book appointment. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black pt-28 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-white mb-4">
            Book Your Session
          </h1>
          <p className="text-xl text-white/70">
            Take the next step on your spiritual journey
          </p>
        </motion.div>

        {success ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardContent className="py-16">
                <div className="text-center">
                  <CheckCircle className="h-24 w-24 text-green-400 mx-auto mb-6" />
                  <h2 className="text-3xl font-bold text-white mb-4">
                    Appointment Booked!
                  </h2>
                  <p className="text-white/70 text-lg mb-2">
                    Your session has been successfully scheduled.
                  </p>
                  <p className="text-white/70">
                    Redirecting to your dashboard...
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-2xl text-white">
                  Appointment Details
                </CardTitle>
                <CardDescription className="text-white/70">
                  Fill in the information below to schedule your session
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg">
                      {error}
                    </div>
                  )}

                  {/* Appointment Type */}
                  <div className="space-y-4">
                    <Label className="text-white text-lg">
                      Select Service Type
                    </Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {appointmentTypes.map((type) => (
                        <motion.div
                          key={type.value}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <label
                            className={`block p-4 rounded-lg border-2 cursor-pointer transition-all ${
                              formData.type === type.value
                                ? "border-purple-500 bg-purple-500/20"
                                : "border-white/30 bg-white/5 hover:border-white/50"
                            }`}
                          >
                            <input
                              type="radio"
                              name="type"
                              value={type.value}
                              checked={formData.type === type.value}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  type: e.target.value,
                                })
                              }
                              className="sr-only"
                              required
                            />
                            <div className="text-white font-semibold mb-1">
                              {type.label}
                            </div>
                            <div className="text-white/70 text-sm">
                              {type.description}
                            </div>
                          </label>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Date and Time */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="date" className="text-white">
                        <Calendar className="inline mr-2 h-4 w-4" />
                        Preferred Date
                      </Label>
                      <Input
                        id="date"
                        type="date"
                        min={minDate}
                        required
                        value={formData.date}
                        onChange={(e) =>
                          setFormData({ ...formData, date: e.target.value })
                        }
                        className="bg-white/10 border-white/30 text-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="time" className="text-white">
                        <Clock className="inline mr-2 h-4 w-4" />
                        Preferred Time
                      </Label>
                      <select
                        id="time"
                        required
                        value={formData.time}
                        onChange={(e) =>
                          setFormData({ ...formData, time: e.target.value })
                        }
                        className="w-full h-10 rounded-md bg-white/10 border border-white/30 text-white px-3 py-2"
                      >
                        <option value="">Select a time</option>
                        <option value="9:00 AM">9:00 AM</option>
                        <option value="10:00 AM">10:00 AM</option>
                        <option value="11:00 AM">11:00 AM</option>
                        <option value="12:00 PM">12:00 PM</option>
                        <option value="1:00 PM">1:00 PM</option>
                        <option value="2:00 PM">2:00 PM</option>
                        <option value="3:00 PM">3:00 PM</option>
                        <option value="4:00 PM">4:00 PM</option>
                        <option value="5:00 PM">5:00 PM</option>
                      </select>
                    </div>
                  </div>

                  {/* Additional Notes */}
                  <div className="space-y-2">
                    <Label htmlFor="notes" className="text-white">
                      <FileText className="inline mr-2 h-4 w-4" />
                      Additional Notes (Optional)
                    </Label>
                    <Textarea
                      id="notes"
                      rows={4}
                      placeholder="Share any specific topics or questions you'd like to discuss..."
                      value={formData.notes}
                      onChange={(e) =>
                        setFormData({ ...formData, notes: e.target.value })
                      }
                      className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="spiritual"
                    className="w-full text-lg py-6"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Booking...
                      </>
                    ) : (
                      "Confirm Appointment"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
