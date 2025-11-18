"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Textarea,
  Button,
  Select,
  SelectItem,
} from "@heroui/react";

export default function InquiryFormCard() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    enquiryType: "",
    details: "",
  });
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    type: "success",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok) {
        setSnackbar({
          open: true,
          type: "success",
          message: data.message,
        });
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          enquiryType: "",
          details: "",
        });
      } else {
        setSnackbar({ open: true, type: "error", message: data.error });
      }
    } catch (err: any) {
      setSnackbar({ open: true, type: "error", message: err.message });
    }
    setLoading(false);
  };

  const handleClear = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      enquiryType: "",
      details: "",
    });
  };

  return (
    <div className="relative group">
      <div className="absolute -inset-[3px] rounded-2xl bg-gradient-to-br from-danger/70 to-primary/70 opacity-60 blur-lg group-hover:opacity-90 transition duration-500" />
      <Card className="relative p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20">
        <CardHeader>
          <h2 className="text-2xl font-bold text-white mb-4">Inquiry Form</h2>
        </CardHeader>
        <CardBody>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input
              required
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
            <Input
              required
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
            <Input
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <Input
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
            <Select
              isRequired
              label="Enquiry Type"
              selectedKeys={[formData.enquiryType]}
              onChange={(e) =>
                handleChange({
                  target: {
                    name: "enquiryType",
                    value: e.target.value,
                  },
                } as any)
              }
            >
              <SelectItem key="General Inquiry">General Inquiry</SelectItem>
              <SelectItem key="Insurance">Insurance</SelectItem>
              <SelectItem key="Payment">Payment</SelectItem>
              <SelectItem key="Support">Support</SelectItem>
              <SelectItem key="Other">Other</SelectItem>
            </Select>
            <Textarea
              required
              label="Details"
              name="details"
              rows={4}
              value={formData.details}
              onChange={handleChange}
            />
            <div className="flex justify-end mt-4 gap-4">
              <Button className="bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-transform" type="button" onClick={handleClear}>
                Clear
              </Button>
              <Button
                className="bg-gradient-to-r from-primary to-primary-600 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-transform"
                isLoading={loading}
                type="submit"
              >
                Submit
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>

      {snackbar.open && (
        <div
          className={`fixed bottom-6 right-6 p-4 rounded-xl shadow-lg text-white ${snackbar.type === "success" ? "bg-green-600" : "bg-red-600"
            }`}
        >
          {snackbar.message}
          <button
            className="ml-4 font-bold"
            onClick={() => setSnackbar({ ...snackbar, open: false })}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
