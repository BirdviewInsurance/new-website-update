"use client";

import React, { useRef, useState, useEffect } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Input,
    Textarea,
    Select,
    SelectItem,
    Button,
    Badge,
    Chip,
} from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { UploadCloud, FileText, Trash2, DownloadCloud, Send, X } from "lucide-react";

export default function EvacuationRepatriationClaimForm() {
    // react-hook-form
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({ mode: "onBlur" });

    // local state
    const [files, setFiles] = useState<File[]>([]);
    const [signatureUrl, setSignatureUrl] = useState<string | null>(null);
    const [loadingPdf, setLoadingPdf] = useState(false);

    // toast state (center-fade single toast)
    const [toast, setToast] = useState<{
        open: boolean;
        type: "success" | "error" | "info";
        message: string;
    }>({
        open: false,
        type: "success", // success | error | info
        message: "",
    });

    // refs for canvas and form (PDF export)
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const formRef = useRef<HTMLFormElement | null>(null);
    const drawing = useRef(false);

    // helper: show toast
    const showToast = (type: "success" | "error" | "info", message: string, duration = 4000) => {
        setToast({ open: true, type, message });
        if (duration > 0) {
            setTimeout(() => setToast((t) => ({ ...t, open: false })), duration);
        }
    };

    // files handlers
    const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newFiles = Array.from(e.target.files || []);
        setFiles((p) => [...p, ...newFiles]);
    };
    const removeFile = (index: number) => setFiles((p) => p.filter((_, i) => i !== index));

    // signature drawing handlers
    const startDraw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
        if (!canvasRef.current) return;
        drawing.current = true;
        const rect = canvasRef.current.getBoundingClientRect();
        const ctx = canvasRef.current.getContext("2d");
        if (!ctx) return;
        ctx.lineWidth = 2.6;
        ctx.lineCap = "round";
        ctx.beginPath();
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
        const x = clientX - rect.left;
        const y = clientY - rect.top;
        ctx.moveTo(x, y);
    };
    const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
        if (!drawing.current || !canvasRef.current) return;
        const rect = canvasRef.current.getBoundingClientRect();
        const ctx = canvasRef.current.getContext("2d");
        if (!ctx) return;
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
        const x = clientX - rect.left;
        const y = clientY - rect.top;
        ctx.lineTo(x, y);
        ctx.strokeStyle = "#111827"; // near-black stroke for clarity
        ctx.stroke();
    };
    const endDraw = () => (drawing.current = false);

    const clearSignature = () => {
        if (!canvasRef.current) return;
        const ctx = canvasRef.current.getContext("2d");
        if (!ctx) return;
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        setSignatureUrl(null);
    };
    const saveSignature = () => {
        if (!canvasRef.current) return;
        const dataUrl = canvasRef.current.toDataURL("image/png");
        setSignatureUrl(dataUrl);
        showToast("success", "Signature saved.");
    };

    // Export visible form to PDF (html2canvas + jsPDF)
    const exportPdf = async () => {
        if (!formRef.current) return;
        try {
            setLoadingPdf(true);
            // render with html2canvas
            const domNode = formRef.current;
            const canvas = await html2canvas(domNode, {
                scale: 2,
                useCORS: true,
                backgroundColor: "#ffffff",
            });
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "a4");
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = 210;
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
            pdf.save("evacuation-repatriation-claim.pdf");
            showToast("success", "PDF generated and downloaded.");
        } catch (err: any) {
            console.error("PDF export error:", err);
            showToast("error", "Failed to generate PDF.");
        } finally {
            setLoadingPdf(false);
        }
    };

    // Submit handler (multipart form with signature & files)
    const onSubmit = async (data: Record<string, any>) => {
        if (!signatureUrl) {
            showToast("error", "Please save your signature before submitting.");
            return;
        }
        try {
            const fd = new FormData();
            // append fields
            Object.entries(data).forEach(([k, v]) => {
                const value = v ?? "";
                if (typeof value === "string" || value instanceof Blob) {
                    fd.append(k, value);
                } else {
                    fd.append(k, String(value));
                }
            });
            // append files
            files.forEach((f) => fd.append("supportingFiles[]", f));
            // append signature as blob
            const res = await fetch(signatureUrl);
            const blob = await res.blob();
            fd.append("signature", blob, "signature.png");

            // replace with your endpoint
            const resp = await fetch("/api/evacuation-claim", { method: "POST", body: fd });
            if (!resp.ok) {
                const text = await resp.text();
                throw new Error(text || "Server responded with an error");
            }

            showToast("success", "Claim submitted successfully.");
            reset();
            setFiles([]);
            clearSignature();
        } catch (err: any) {
            console.error("Submission failed:", err);
            showToast("error", err?.message || "Submission failed.");
        }
    };

    // initialize canvas pixel ratio on mount for crisp strokes
    useEffect(() => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        canvas.width = Math.floor(rect.width * dpr);
        canvas.height = Math.floor(rect.height * dpr);
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.scale(dpr, dpr);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, []);

    // small helper component for required label
    const RequiredLabel = ({ text }: { text: string }) => (
        <span className="flex items-center gap-1">
            <span>{text}</span>
            <span className="text-rose-500 font-semibold">*</span>
        </span>
    );

    // gradient used in design
    const gradient = "linear-gradient(90deg, #0284C7, #2563EB, #1E3A8A)";

    return (
        <>
            <div
                className="min-h-screen flex items-center justify-center px-4 
             bg-[url('/images/backdrop2.png')] bg-cover bg-center bg-no-repeat"
            >
                <div className="max-w-[1200px] mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Left Info Panel */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.45 }}
                            className="rounded-2xl p-6 text-white"
                            style={{
                                background: "linear-gradient(180deg,#0284C7 0%, #2563EB 50%, #1E3A8A 100%)",
                                minHeight: 420,
                                position: "relative",
                                overflow: "hidden",
                            }}
                        >
                            <div className="z-10 relative flex flex-col h-full">
                                <div>
                                    <h3 className="text-lg font-extrabold drop-shadow-sm">Evacuation & Repatriation</h3>
                                    <p className="mt-2 text-sm opacity-90">Emergency e-Claim Form</p>
                                </div>

                                <div className="mt-6 text-xs opacity-90 space-y-1">
                                    <div>Secure submission • Confidential</div>
                                    <div>Form ID: <span className="font-mono">EVAC-CLAIM-2025</span></div>
                                </div>

                                <div className="mt-auto text-right">
                                    <img
                                        alt="brand"
                                        src="/images/logo1.png"
                                        style={{ opacity: 0.08, width: 160 }}
                                        className="pointer-events-none mx-auto"
                                    />
                                </div>
                            </div>
                        </motion.div>

                        {/* Right Form Panel */}
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.45 }}
                            className="md:col-span-2"
                        >
                            <Card className="rounded-2xl shadow-2xl border border-gray-100">
                                <CardHeader className="py-6">
                                    <div className="text-left">
                                        <h2 className="text-2xl font-extrabold text-primary">Evacuation & Repatriation Claim Form</h2>
                                        <p className="text-sm text-slate-500 mt-1">
                                            Provide accurate information and attach required documents. For repatriation of mortal remains include death certificate and repatriation invoice.
                                        </p>
                                    </div>
                                </CardHeader>

                                <CardBody>
                                    <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                        {/* Section 1 - Policy & Personal Details */}
                                        <section>
                                            <motion.div
                                                initial={{ opacity: 0, x: -20 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true, amount: 0.2 }}
                                                transition={{ duration: 0.45 }}
                                            >
                                                <div className="flex items-center gap-3 mb-3">
                                                    <div className="w-1.5 h-10 rounded bg-gradient-to-b from-blue-500 to-indigo-600" />
                                                    <h3 className="font-semibold text-primary">1 — Policy & Personal Details</h3>
                                                </div>
                                            </motion.div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                <Input
                                                    label={<RequiredLabel text="Insured Person's Full Name" />}
                                                    {...register("insuredName", { required: "This field is required" })}
                                                    isInvalid={!!errors.insuredName}
                                                    errorMessage={errors.insuredName?.message as string}
                                                />
                                                <Input
                                                    label={<RequiredLabel text="Policy Number" />}
                                                    {...register("policyNumber", { required: "This field is required" })}
                                                    isInvalid={!!errors.policyNumber}
                                                    errorMessage={errors.policyNumber?.message as string}
                                                />
                                                <Input
                                                    label={<RequiredLabel text="Date of Birth" />}
                                                    type="date"
                                                    {...register("dob", { required: "This field is required" })}
                                                    isInvalid={!!errors.dob}
                                                    errorMessage={errors.dob?.message as string}
                                                />
                                                <Input
                                                    label={<RequiredLabel text="Contact (phone & email)" />}
                                                    placeholder="+254 7xx xxx xxx | email@domain.com"
                                                    className="md:col-span-2"
                                                    {...register("contactInfo", { required: "This field is required" })}
                                                    isInvalid={!!errors.contactInfo}
                                                    errorMessage={errors.contactInfo?.message as string}
                                                />
                                                <Input
                                                    label="Permanent Address"
                                                    {...register("permanentAddress")}
                                                />
                                                <Input
                                                    label="Occupation"
                                                    {...register("occupation")}
                                                />
                                                <Input
                                                    label="ID / Passport Number"
                                                    {...register("idNumber")}
                                                />
                                                <Input
                                                    label="Other Insurance Details (if any)"
                                                    {...register("otherInsurance")}
                                                />
                                                <Input
                                                    label="Emergency Contact (name & phone)"
                                                    {...register("emergencyContact")}
                                                />
                                                <Input
                                                    label={<RequiredLabel text="Claimant / Primary Insured Email" />}
                                                    type="email"
                                                    {...register("claimantEmail", { required: "This field is required" })}
                                                    isInvalid={!!errors.claimantEmail}
                                                    errorMessage={errors.claimantEmail?.message as string}
                                                />
                                                <div className="col-span-full md:col-span-1">
                                                    <Select
                                                        label={<RequiredLabel text="Claimant Relationship" />}
                                                        {...register("claimantRelationship", { required: "This field is required" })}
                                                        isInvalid={!!errors.claimantRelationship}
                                                        errorMessage={errors.claimantRelationship?.message as string}
                                                    >
                                                        <SelectItem key="SELF">Self</SelectItem>
                                                        <SelectItem key="RECRUITING_AGENCY">Recruiting Agency</SelectItem>
                                                        <SelectItem key="CHILD">Child</SelectItem>
                                                        <SelectItem key="SIBLING">Sibling</SelectItem>
                                                        <SelectItem key="PARENT">Parent</SelectItem>
                                                    </Select>
                                                </div>
                                            </div>
                                        </section>

                                        <hr className="border-t border-slate-100" />

                                        {/* Section 2 - Trip Details */}
                                        <section>
                                            <motion.div
                                                initial={{ opacity: 0, x: -20 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true, amount: 0.2 }}
                                                transition={{ duration: 0.45 }}
                                            >
                                                <div className="flex items-center gap-3 mb-3">
                                                    <div className="w-1.5 h-10 rounded bg-gradient-to-b from-blue-500 to-indigo-600" />
                                                    <h3 className="font-semibold text-primary">2 — Trip Details</h3>
                                                </div>
                                            </motion.div>

                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                <Input
                                                    label={<RequiredLabel text="Trip Destination (Country)" />}
                                                    {...register("destinationCountry", { required: "This field is required" })}
                                                    isInvalid={!!errors.destinationCountry}
                                                    errorMessage={errors.destinationCountry?.message as string}
                                                />
                                                <Input
                                                    label={<RequiredLabel text="Reason for Travel" />}
                                                    {...register("reasonForTravel", { required: "This field is required" })}
                                                    isInvalid={!!errors.reasonForTravel}
                                                    errorMessage={errors.reasonForTravel?.message as string}
                                                />
                                                <Input label="Travel Agent / Tour Operator" {...register("travelAgent")} />
                                                <Input label="Travel Start Date" type="date" {...register("travelStart")} />
                                                <Input label="Travel End Date" type="date" {...register("travelEnd")} />
                                                <Input
                                                    label={<RequiredLabel text="Incident Date" />}
                                                    type="date"
                                                    {...register("incidentDate", { required: "This field is required" })}
                                                    isInvalid={!!errors.incidentDate}
                                                    errorMessage={errors.incidentDate?.message as string}
                                                />
                                            </div>
                                        </section>

                                        <hr className="border-t border-slate-100" />

                                        {/* Section 3 - Incident Details */}
                                        <section>
                                            <motion.div
                                                initial={{ opacity: 0, x: -20 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true, amount: 0.2 }}
                                                transition={{ duration: 0.45 }}
                                            >
                                                <div className="flex items-center gap-3 mb-3">
                                                    <div className="w-1.5 h-10 rounded bg-gradient-to-b from-blue-500 to-indigo-600" />
                                                    <h3 className="font-semibold text-primary">3 — Incident Details</h3>
                                                </div>
                                            </motion.div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <Textarea
                                                    label={<RequiredLabel text="Circumstances of Incident" />}
                                                    rows={4}
                                                    {...register("incidentCircumstances", { required: "This field is required" })}
                                                    isInvalid={!!errors.incidentCircumstances}
                                                    errorMessage={errors.incidentCircumstances?.message as string}
                                                />
                                            </div>
                                            <br />
                                            <div className="space-y-3">
                                                <Input
                                                    label={<RequiredLabel text="Reason for Evacuation / Repatriation" />}
                                                    {...register("evacuationReason", { required: "This field is required" })}
                                                    isInvalid={!!errors.evacuationReason}
                                                    errorMessage={errors.evacuationReason?.message as string}
                                                />
                                                <Input label="Initial Medical Treatment (date & place)" {...register("initialTreatment")} />
                                                <Input label="Treating Physician's Name" {...register("treatingPhysician")} />

                                                <div className="grid grid-cols-2 gap-3">
                                                    <Select label="Reported to Assistance Provider?" {...register("reportedToProvider")}>
                                                        <SelectItem key="YES">Yes</SelectItem>
                                                        <SelectItem key="NO">No</SelectItem>
                                                    </Select>
                                                    <Input label="Notification Date / Confirmation #" type="date" {...register("notificationInfo")} />
                                                </div>
                                            </div>
                                        </section>

                                        <hr className="border-t border-slate-100" />

                                        {/* Section 4 - Expenses */}
                                        <section>
                                            <motion.div
                                                initial={{ opacity: 0, x: -20 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true, amount: 0.2 }}
                                                transition={{ duration: 0.45 }}
                                            >
                                                <div className="flex items-center gap-3 mb-3">
                                                    <div className="w-1.5 h-10 rounded bg-gradient-to-b from-blue-500 to-indigo-600" />
                                                    <h3 className="font-semibold text-primary">4 — Details of Expenses Claimed</h3>
                                                </div>
                                            </motion.div>

                                            <p className="text-sm text-slate-500 mb-3">List out-of-pocket expenses and attach itemized bills & receipts.</p>

                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                <Input label="Emergency Transport Date" type="date" {...register("transportDate")} />
                                                <Input label="Transport Description (air ambulance / ground / escort)" {...register("transportDesc")} />
                                                <Input label="Transport Amount (USD)" {...register("transportAmount")} />
                                                <Input label="Repatriation Date" type="date" {...register("repatDate")} />
                                                <Input label="Repatriation Description" {...register("repatDesc")} />
                                                <Input label="Repatriation Amount (USD)" {...register("repatAmount")} />
                                                <Input label="Medical Expense Date" type="date" {...register("medicalDate")} />
                                                <Input label="Medical Description" {...register("medicalDesc")} />
                                                <Input label="Medical Amount (USD)" {...register("medicalAmount")} />
                                                <Input label="Other Expense Date" type="date" {...register("otherDate")} />
                                                <Input label="Other Expense Description" {...register("otherDesc")} />
                                                <Input label="Other Expense Amount (USD)" {...register("otherAmount")} />
                                            </div>
                                        </section>

                                        <hr className="border-t border-slate-100" />

                                        {/* Section 5 - Payment Information */}
                                        <section>
                                            <motion.div
                                                initial={{ opacity: 0, x: -20 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true, amount: 0.2 }}
                                                transition={{ duration: 0.45 }}
                                            >
                                                <div className="flex items-center gap-3 mb-3">
                                                    <div className="w-1.5 h-10 rounded bg-gradient-to-b from-blue-500 to-indigo-600" />
                                                    <h3 className="font-semibold text-primary">5 — Payment Information</h3>
                                                </div>
                                            </motion.div>

                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                <Input
                                                    label={<RequiredLabel text="Preferred Payment Method" />}
                                                    {...register("paymentMethod", { required: "This field is required" })}
                                                    isInvalid={!!errors.paymentMethod}
                                                    errorMessage={errors.paymentMethod?.message as string}
                                                />
                                                <Input
                                                    label={<RequiredLabel text="Bank Name" />}
                                                    {...register("bankName", { required: "This field is required" })}
                                                    isInvalid={!!errors.bankName}
                                                    errorMessage={errors.bankName?.message as string}
                                                />
                                                <Input
                                                    label={<RequiredLabel text="Account Number" />}
                                                    {...register("accountNumber", { required: "This field is required" })}
                                                    isInvalid={!!errors.accountNumber}
                                                    errorMessage={errors.accountNumber?.message as string}
                                                />
                                                <Input label="Account Holder Name" {...register("accountHolder")} />
                                                <Input label="SWIFT / IBAN" {...register("swiftIban")} />
                                            </div>
                                        </section>

                                        <hr className="border-t border-slate-100" />

                                        {/* Section 6 - Supporting Documents, Declaration & Signature */}
                                        <section>
                                            <motion.div
                                                initial={{ opacity: 0, x: -20 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true, amount: 0.2 }}
                                                transition={{ duration: 0.45 }}
                                            >
                                                <div className="flex items-center gap-3 mb-3">
                                                    <div className="w-1.5 h-10 rounded bg-gradient-to-b from-blue-500 to-indigo-600" />
                                                    <h3 className="font-semibold text-primary">6 — Supporting Documents, Declaration & Signature</h3>
                                                </div>
                                            </motion.div>

                                            <p className="text-sm text-slate-500 mb-2">
                                                Upload scanned copies: medical records, itemized bills, death certificate (if applicable), police report, passport copies, travel itinerary, evacuation invoice, repatriation invoice, proof of payment, exit visa, evacuation authorization letter, flight details.
                                            </p>

                                            <div className="flex items-center gap-3 mb-4">
                                                <label className="inline-flex items-center gap-2 cursor-pointer">
                                                    <input
                                                        type="file"
                                                        multiple
                                                        accept="image/*,application/pdf"
                                                        onChange={handleFilesChange}
                                                        className="hidden"
                                                    />
                                                    <Button
                                                        variant="ghost"
                                                        className="px-3 py-2 border rounded-md bg-primary text-white hover:bg-danger transition"
                                                    >
                                                        <UploadCloud size={16} className="mr-2" /> Upload Supporting Documents
                                                    </Button>
                                                </label>

                                                <div className="text-sm text-slate-500">{files.length} file(s) selected</div>

                                                <div className="ml-auto flex items-center gap-2">
                                                    <Button
                                                        onClick={exportPdf}
                                                        variant="bordered"
                                                        className="px-3 py-2 flex items-center gap-2 border-primary text-primary hover:bg-primary/10 transition"
                                                    >
                                                        <DownloadCloud size={14} /> {loadingPdf ? "Generating..." : "Export PDF"}
                                                    </Button>

                                                    <Button
                                                        type="submit"
                                                        variant="solid"
                                                        className="px-4 py-2 flex items-center gap-2 bg-primary text-white hover:bg-primary/90 transition"
                                                        disabled={isSubmitting}
                                                    >
                                                        <Send size={14} /> {isSubmitting ? "Submitting..." : "Submit Claim"}
                                                    </Button>
                                                </div>
                                            </div>

                                            {files.length > 0 && (
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                                                    {files.map((f, i) => (
                                                        <div key={i} className="flex items-center justify-between p-2 rounded border border-slate-100 bg-white">
                                                            <div className="flex items-center gap-2">
                                                                <FileText size={16} />
                                                                <div className="text-sm truncate max-w-[260px]">{f.name}</div>
                                                            </div>
                                                            <button type="button" onClick={() => removeFile(i)} className="p-1 rounded hover:bg-slate-50">
                                                                <Trash2 size={14} />
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                                                <div className="md:col-span-2">
                                                    <label className="block text-sm mb-2">Digital Signature (draw inside the box)</label>
                                                    <div className="rounded-md border-2 border-primary bg-white overflow-hidden">
                                                        <canvas
                                                            ref={canvasRef}
                                                            style={{ width: "100%", height: 150, touchAction: "none", display: "block" }}
                                                            onMouseDown={startDraw}
                                                            onMouseMove={draw}
                                                            onMouseUp={endDraw}
                                                            onMouseLeave={endDraw}
                                                            onTouchStart={startDraw}
                                                            onTouchMove={draw}
                                                            onTouchEnd={endDraw}
                                                        />
                                                    </div>

                                                    <div className="flex gap-2 mt-2">
                                                        <Button
                                                            variant="bordered"
                                                            onClick={clearSignature}
                                                            className="px-3 py-2 flex items-center gap-2 text-primary border border-primary hover:bg-primary/10 transition"
                                                        >
                                                            <X size={14} /> Clear
                                                        </Button>

                                                        <Button variant="solid" onClick={saveSignature} className="px-3 py-2 flex items-center gap-2 bg-primary text-white hover:bg-primary/90 transition">
                                                            Save Signature
                                                        </Button>
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className="block text-sm mb-2">Saved Signature Preview</label>
                                                    <div className="rounded-md border border-slate-100 bg-white p-3 min-h-[150px] flex items-center justify-center">
                                                        {signatureUrl ? (
                                                            <img src={signatureUrl} alt="signature preview" style={{ maxWidth: "100%", maxHeight: 120 }} />
                                                        ) : (
                                                            <div className="text-xs text-slate-400">No signature saved</div>
                                                        )}
                                                    </div>

                                                    <Input
                                                        label={<RequiredLabel text="Declaration Date" />}
                                                        type="date"
                                                        className="mt-3"
                                                        {...register("declarationDate", { required: "This field is required" })}
                                                        isInvalid={!!errors.declarationDate}
                                                        errorMessage={errors.declarationDate?.message as string}
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between mt-4">
                                                <Button
                                                    variant="ghost"
                                                    onClick={() => { reset(); setFiles([]); clearSignature(); }}
                                                    className="px-3 py-2 flex items-center gap-2 bg-red-600 text-white hover:bg-red-500 transition"
                                                >
                                                    Reset
                                                </Button>

                                                <p className="text-xs text-slate-500">By submitting you declare that the information provided is true and accurate.</p>
                                            </div>
                                        </section>
                                    </form>
                                </CardBody>

                                <CardFooter className="py-4" />
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Center-fade single toast (dark-glass theme) */}
            <AnimatePresence>
                {toast.open && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98, y: 8 }}
                        transition={{ duration: 0.28 }}
                        style={{ pointerEvents: "auto" }}
                    >
                        <div
                            className="fixed left-1/2 transform -translate-x-1/2 bottom-12 z-[9999] max-w-xl w-[min(92%,640px)]"
                            aria-live="polite"
                        >
                            <div
                                className={`rounded-2xl px-5 py-4 flex items-start gap-4 shadow-2xl border border-white/8`}
                                style={{
                                    background: "linear-gradient(180deg, rgba(6,8,15,0.70), rgba(17,24,39,0.60))",
                                    backdropFilter: "blur(8px)",
                                    color: toast.type === "error" ? "#fee2e2" : "#e6f4ff",
                                    boxShadow: "0 8px 30px rgba(2,6,23,0.45)",
                                }}
                            >
                                <div className="flex-shrink-0">
                                    <div
                                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                                        style={{
                                            background:
                                                toast.type === "success"
                                                    ? "linear-gradient(90deg,#10b981,#059669)"
                                                    : "linear-gradient(90deg,#ef4444,#b91c1c)",
                                        }}
                                    >
                                        {toast.type === "success" ? (
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                                <path d="M20 6L9 17l-5-5" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        ) : (
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                                <path d="M12 9v4M12 17h.01" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94A2 2 0 0 0 23 18L14.5 3.86a2 2 0 0 0-3.21 0z" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        )}
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <div className="font-semibold text-sm">{toast.type === "success" ? "Success" : toast.type === "error" ? "Error" : "Info"}</div>
                                    <div className="text-sm mt-1 leading-tight" style={{ opacity: 0.95 }}>
                                        {toast.message}
                                    </div>
                                </div>

                                <button
                                    onClick={() => setToast((t) => ({ ...t, open: false }))}
                                    className="ml-4 -mr-2 p-2 rounded hover:bg-white/4"
                                    aria-label="dismiss"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
