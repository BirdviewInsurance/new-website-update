"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Input,
  Select,
  SelectItem,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Badge,
  Avatar,
} from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";
// country-state-city can be used if installed; left in case you want it.
// import { Country } from "country-state-city";

/* ===========================
   Types
   =========================== */

type ToastType = "success" | "error" | "info" | "warning";

interface ToastModel {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
  timeout?: number;
}

export interface DependantType {
  id: number | string;
  relationship: string;
  title: string;
  firstName: string;
  middleName: string;
  surname: string;
  idtypes: string;
  idnos: string;
  dob: string;
  gendere: string;
  countrye: string;
  cities: string;
  [k: string]: any;
}

export interface BeneficiaryType {
  id: number | string;
  relationship: string;
  title: string;
  beneficiary_fullname: string;
  dob: string;
  phone_number: string;
  beneficiary_address: string;
  beneficiary_email: string;
  [k: string]: any;
}

export interface FormdataType {
  memberidno: string;
  groupname: string;
  groupnumber: string;
  title: string;
  firstname: string;
  lastname: string;
  middlename: string;
  idtype: string;
  idno: string;
  dateofbirth: string;
  gender: string;
  country: string;
  city: string;
  address: string;
  mobileno: string;
  eimail: string;
  option?: string;
  dependantsData: DependantType[];
  beneficiariesData: BeneficiaryType[];
  selectedOption?: string;

  medical?: boolean;
  medicalOption?: string | string[];
  principalAge?: string | number;
  ageGroup?: string;
  lastExpense?: boolean;
  lastExpenseOptions?: string[];
  [k: string]: any;
}

/* ===========================
   Toast system (frosted)
   =========================== */

const toastId = () => `t_${Math.random().toString(36).slice(2, 9)}`;

const toastColors: Record<ToastType, string> = {
  success: "text-emerald-700 bg-emerald-50/60 border-emerald-200/40",
  error: "text-rose-700 bg-rose-50/60 border-rose-200/40",
  info: "text-sky-700 bg-sky-50/60 border-sky-200/40",
  warning: "text-amber-700 bg-amber-50/60 border-amber-200/40",
};

const ToastIcon: React.FC<{ type: ToastType }> = ({ type }) => {
  if (type === "success") {
    return (
      <svg
        className="shrink-0"
        fill="none"
        height="18"
        viewBox="0 0 24 24"
        width="18"
      >
        <path
          d="M20 6L9 17l-5-5"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    );
  }
  if (type === "error") {
    return (
      <svg
        className="shrink-0"
        fill="none"
        height="18"
        viewBox="0 0 24 24"
        width="18"
      >
        <path
          d="M18 6L6 18M6 6l12 12"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    );
  }

  return (
    <svg
      className="shrink-0"
      fill="none"
      height="18"
      viewBox="0 0 24 24"
      width="18"
    >
      <path
        d="M12 2v20M2 12h20"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
};

function useFrostedToasts() {
  const [toasts, setToasts] = useState<ToastModel[]>([]);
  const timers = useRef<Record<string, number>>({});

  const push = (t: {
    type: ToastType;
    message: string;
    title?: string;
    timeout?: number;
  }) => {
    const id = toastId();
    const model: ToastModel = {
      id,
      type: t.type,
      title: t.title,
      message: t.message,
      timeout: t.timeout ?? 4500,
    };

    setToasts((p) => [model, ...p]);
    if (model.timeout && model.timeout > 0) {
      timers.current[id] = window.setTimeout(() => {
        setToasts((p) => p.filter((tt) => tt.id !== id));
        delete timers.current[id];
      }, model.timeout);
    }

    return id;
  };

  const dismiss = (id: string) => {
    setToasts((p) => p.filter((t) => t.id !== id));
    if (timers.current[id]) {
      window.clearTimeout(timers.current[id]);
      delete timers.current[id];
    }
  };

  const api = {
    success: (msg: string, title?: string) =>
      push({ type: "success", message: msg, title }),
    error: (msg: string, title?: string) =>
      push({ type: "error", message: msg, title }),
    info: (msg: string, title?: string) =>
      push({ type: "info", message: msg, title }),
    warning: (msg: string, title?: string) =>
      push({ type: "warning", message: msg, title }),
    dismiss,
    toasts,
  };

  return [api, toasts, setToasts] as const;
}

const ToastContainer: React.FC<{
  toasts: ToastModel[];
  onDismiss: (id: string) => void;
}> = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed top-6 right-6 z-[9999] flex flex-col gap-3 items-end">
      <AnimatePresence initial={false}>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            animate={{ opacity: 1, x: 0 }}
            className={`w-[360px] max-w-xs p-3 rounded-2xl border backdrop-blur-md shadow-xl ${toastColors[t.type]}`}
            exit={{ opacity: 0, x: 40 }}
            initial={{ opacity: 0, x: 40 }}
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.44), rgba(255,255,255,0.18))",
            }}
            transition={{ duration: 0.28 }}
          >
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-white/10 border border-white/5 flex items-center justify-center">
                <span aria-hidden className="text-lg">
                  <ToastIcon type={t.type} />
                </span>
              </div>
              <div className="flex-1">
                {t.title && (
                  <div className="font-semibold text-sm mb-1 text-slate-800">
                    {t.title}
                  </div>
                )}
                <div className="text-sm text-slate-700 leading-tight break-words">
                  {t.message}
                </div>
              </div>
              <button
                aria-label="Dismiss toast"
                className="ml-2 text-slate-500 hover:text-slate-700 transition-opacity"
                onClick={() => onDismiss(t.id)}
              >
                ×
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

/* ===========================
   Component
   =========================== */

const KenyansInJapanMemberForm: React.FC = () => {
  // toasts
  const [toastApi, toasts, setToasts] = useFrostedToasts();

  // visual & state
  const [loaderIcon, setLoaderIcon] = useState<boolean>(false);
  const [paymentPending, setPaymentPending] = useState<boolean>(false);
  const [paymentConfirmed, setPaymentConfirmed] = useState<boolean>(false);

  // modals
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [openBeneficiaryDialog, setOpenBeneficiaryDialog] =
    useState<boolean>(false);

  const [currentDependant, setCurrentDependant] =
    useState<DependantType | null>(null);
  const [currentBeneficiary, setCurrentBeneficiary] =
    useState<BeneficiaryType | null>(null);

  const today = new Date().toISOString().split("T")[0];

  // counts
  const [dependentCount, setDependentCount] = useState<number>(0);
  const [beneficiaryCount, setBeneficiaryCount] = useState<number>(0);

  // errors + file errors
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [fileError, setFileError] = useState<string | null>(null);

  const [isAdultRelationshipEligible, setIsAdultRelationshipEligible] =
    useState<boolean>(true);

  const [medicalCover, setMedicalCover] = useState("");
  const [lastExpenseCover, setLastExpenseCover] = useState("");
  const [totalPremium, setTotalPremium] = useState(0);

  // form data
  const [formData, setFormData] = useState<FormdataType>({
    memberidno: "",
    groupname: "Kenyans In Japan",
    groupnumber: "KIJA",
    title: "",
    firstname: "",
    lastname: "",
    middlename: "",
    idtype: "",
    idno: "",
    dateofbirth: "",
    gender: "",
    country: "",
    city: "",
    address: "",
    mobileno: "",
    eimail: "",
    family_option: "",
    option: "",
    dependantsData: [],
    beneficiariesData: [],
    medical: false,
    medicalOption: "",
    principalAge: "",
    ageGroup: "",
    lastExpense: false,
    lastExpenseOptions: [],
  });

  useEffect(() => {
    // Generate member id
    const generateMemberId = () => {
      const now = new Date();
      const uniqueNumber = `${now.getFullYear()}${now.getMonth() + 1}${now.getDate()}${now.getHours()}${now.getMinutes()}${now.getSeconds()}${now.getMilliseconds()}`;
      const lastSixDigits = uniqueNumber.slice(-6);

      return `M${lastSixDigits}`;
    };

    setFormData((prev) => ({ ...prev, memberidno: generateMemberId() }));
  }, []);

  useEffect(() => {
    // update dependants array length when count changes
    setFormData((prev) => {
      const existing = prev.dependantsData || [];
      const newDeps = Array.from(
        { length: dependentCount },
        (_, i) =>
          existing[i] || {
            id: i + 1,
            relationship: "",
            title: "",
            firstName: "",
            middleName: "",
            surname: "",
            idtypes: "",
            idnos: "",
            dob: "",
            gendere: "",
            countrye: "",
            cities: "",
          },
      );

      return { ...prev, dependantsData: newDeps };
    });
  }, [dependentCount]);

  useEffect(() => {
    setFormData((prev) => {
      const existing = prev.beneficiariesData || [];
      const newBens = Array.from(
        { length: beneficiaryCount },
        (_, i) =>
          existing[i] || {
            id: i + 1,
            relationship: "",
            title: "",
            beneficiary_fullname: "",
            dob: "",
            phone_number: "",
            beneficiary_address: "",
            beneficiary_email: "",
          },
      );

      return { ...prev, beneficiariesData: newBens };
    });
  }, [beneficiaryCount]);

  // basic country list
  const countries = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Brazil",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Cambodia",
    "Cameroon",
    "Canada",
  ];

  /* ---------------------------
     Helpers (age checks, phone, files)
     --------------------------- */

  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const hasHadBirthday =
      today.getMonth() > birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() &&
        today.getDate() >= birthDate.getDate());

    return hasHadBirthday ? age : age - 1;
  };

  const isAtLeastOneMonthOld = (dob: string) => {
    const birthDate = new Date(dob);
    const today = new Date();
    const diffInMs = today.getTime() - birthDate.getTime();
    const oneMonthInMs = 30 * 24 * 60 * 60 * 1000;

    return diffInMs >= oneMonthInMs;
  };

  const handlePhoneChange = (value: any) => {
    setFormData((prev) => ({ ...prev, mobileno: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const maxSize = 5 * 1024 * 1024;
    const oversized = files.filter((f) => f.size > maxSize);

    if (oversized.length) {
      setFileError("One or more files exceed the 5MB size limit.");
      toastApi.error("One or more files exceed the 5MB size limit.");

      return;
    }
    setFileError("");
    setFormData((prev) => ({ ...prev, supportingDocuments: files }));
  };

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target || {};

    // checkboxes (single)
    if (type === "checkbox" && typeof name === "string") {
      setFormData((prev) => ({ ...prev, [name]: checked }));

      return;
    }

    if (typeof name === "string") {
      setFormData((prev) => ({ ...prev, [name]: value }) as any);
    }
  };

  /* =========================
     Merged submit logic (from uploaded file)
     ========================= */

  const getAmountFromMedical = (medicalOption?: string) => {
    if (!medicalOption) return 0;
    const matchKsh = medicalOption.match(/Kshs\s?([\d,]+)/i);
    const matchGbp = medicalOption.match(/GBP\s?([\d,]+)/i);

    if (matchKsh) return parseInt(matchKsh[1].replace(/,/g, ""), 10);
    if (matchGbp) return parseInt(matchGbp[1].replace(/,/g, ""), 10);

    return 0;
  };

  const getAmountFromLastExpense = (lastExpenseOptions: string[] = []) => {
    return lastExpenseOptions.reduce((sum, opt) => {
      const matchKsh = opt.match(/Kshs\s?([\d,]+)/i);
      const matchGbp = opt.match(/GBP\s?([\d,]+)/i);

      if (matchKsh) return sum + parseInt(matchKsh[1].replace(/,/g, ""), 10);
      if (matchGbp) return sum + parseInt(matchGbp[1].replace(/,/g, ""), 10);

      return sum;
    }, 0);
  };

  useEffect(() => {
    let total = 0;

    // --- MEDICAL PREMIUM ---
    if (formData.medical && formData.medicalOption) {
      if (typeof formData.medicalOption === "string") {
        // For <70 group (radio selection)
        const match = formData.medicalOption.match(/Kshs\s*([\d,]+)/);

        if (match) total += parseInt(match[1].replace(/,/g, ""), 10);
      } else if (Array.isArray(formData.medicalOption)) {
        // For >70 group (multiple selections)
        formData.medicalOption.forEach((item: string) => {
          const match = item.match(/Kshs\s*([\d,]+)/);

          if (match) total += parseInt(match[1].replace(/,/g, ""), 10);
        });
      }
    }

    // --- LAST EXPENSE PREMIUM ---
    if (formData.lastExpense) {
      total += 31800; // Flat rate per family
    }

    setTotalPremium(total);
  }, [formData.medical, formData.medicalOption, formData.lastExpense]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoaderIcon(true);

    try {
      // Beneficiary validation
      const beneficiaryList = formData.beneficiariesData || [];
      const validBeneficiaries = beneficiaryList.filter((b) => b && b.dob);

      for (const ben of validBeneficiaries) {
        if (!isAtLeastOneMonthOld(ben.dob)) {
          toastApi.error(
            `Beneficiary "${ben.beneficiary_fullname}" must be at least 1 month old.`,
          );
          setLoaderIcon(false);

          return;
        }
      }

      if (validBeneficiaries.length === 1) {
        const age = calculateAge(validBeneficiaries[0].dob);

        if (age < 18) {
          toastApi.error(
            "You must add another beneficiary who is at least 18 years old if the only one is below 18.",
          );
          setLoaderIcon(false);

          return;
        }
      }

      if (validBeneficiaries.length > 1) {
        const hasAdult = validBeneficiaries.some(
          (ben) => calculateAge(ben.dob) >= 18,
        );

        if (!hasAdult) {
          toastApi.error("At least one beneficiary must be 18 years or older.");
          setLoaderIcon(false);

          return;
        }
      }

      // amount calc
      let medicalAmount = 0;

      if (formData.medicalOption) {
        if (typeof formData.medicalOption === "string") {
          medicalAmount = getAmountFromMedical(formData.medicalOption);
        } else if (Array.isArray(formData.medicalOption)) {
          medicalAmount = formData.medicalOption.reduce((sum, opt) => {
            const matchKsh = opt.match(/Kshs\s?([\d,]+)/i);
            const matchGbp = opt.match(/GBP\s?([\d,]+)/i);

            if (matchKsh)
              return sum + parseInt(matchKsh[1].replace(/,/g, ""), 10);
            if (matchGbp)
              return sum + parseInt(matchGbp[1].replace(/,/g, ""), 10);

            return sum;
          }, 0);
        }
      }
      const amount =
        medicalAmount + getAmountFromLastExpense(formData.lastExpenseOptions);

      if (!amount || amount <= 0) {
        toastApi.error(
          "❌ Please select a Medical or Last Expense option before submitting.",
        );
        setLoaderIcon(false);

        return;
      }

      // STK push
      const stkResponse = await fetch(
        "https://payments.birdviewinsurance.com/mobile-payments/stk-push",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount,
            phoneNumber: formData.mobileno,
            transactionDescription:
              "KIJA Group Medical and Last Expense Scheme",
            transactionReference: `KIJA${formData.idno}`,
          }),
        },
      );

      const stkResult = await stkResponse.json();

      if (!stkResponse.ok || !stkResult.success) {
        toastApi.error("Failed to initiate payment. Please try again.");
        setLoaderIcon(false);

        return;
      }

      // Poll for confirmation
      setPaymentPending(true);
      setPaymentConfirmed(false);

      const startTime = Date.now();
      const intervalId = window.setInterval(async () => {
        try {
          const confirmRes = await fetch(
            `/api/payment-status?checkoutRequestID=${encodeURIComponent(stkResult.checkoutRequestID)}`,
          );
          const confirmData = await confirmRes.json();

          if (confirmData.status === "CONFIRMED") {
            clearInterval(intervalId);
            setPaymentPending(false);
            setPaymentConfirmed(true);

            // build formdata and submit
            try {
              const fd = new FormData();

              for (const key in formData) {
                // @ts-ignore
                const val = (formData as any)[key];

                if (key === "dependantsData" || key === "beneficiariesData") {
                  fd.append(key, JSON.stringify(val));
                } else if (key === "supportingDocuments") {
                  const docs = val as File[];

                  if (Array.isArray(docs))
                    docs.forEach((f) => fd.append("supportingDocuments", f));
                } else {
                  fd.append(key, val ?? "");
                }
              }

              fd.append(
                "selectedMedicalOption",
                Array.isArray(formData.medicalOption)
                  ? formData.medicalOption.join(", ")
                  : formData.medicalOption || "None",
              );
              fd.append(
                "selectedLastExpenseOptions",
                (formData.lastExpenseOptions || []).join(", ") || "None",
              );
              fd.append("totalPremium", String(amount));

              const res = await fetch(
                "/api/kenyans-in-south-wales-member-form",
                { method: "POST", body: fd },
              );
              const data = await res.json();

              if (res.ok) {
                toastApi.success(
                  data?.message || "Form submitted successfully",
                  "Success",
                );
                handleReset();
              } else {
                toastApi.error(
                  `Error: ${data?.error || "Unknown error"}`,
                  "Submission Failed",
                );
              }
            } catch (submitErr: any) {
              toastApi.error(
                `Error submitting form: ${submitErr?.message || submitErr}`,
                "Submission Error",
              );
            } finally {
              setLoaderIcon(false);
            }
          }

          if (
            ["CANCELLED", "FAILED", "STK_PUSH_TIMEOUT"].includes(
              confirmData.status,
            )
          ) {
            clearInterval(intervalId);
            setPaymentPending(false);
            setPaymentConfirmed(false);
            toastApi.error(
              "❌ Payment was cancelled or failed. Please try again.",
            );
            setLoaderIcon(false);
          }

          if (Date.now() - startTime > 120000) {
            clearInterval(intervalId);
            setPaymentPending(false);
            toastApi.error(
              "⏱ Payment confirmation timed out. Please try again.",
            );
            setLoaderIcon(false);
          }
        } catch (pollErr: any) {
          clearInterval(intervalId);
          setPaymentPending(false);
          toastApi.error(
            `Error checking payment: ${pollErr?.message || pollErr}`,
          );
          setLoaderIcon(false);
        }
      }, 5000);
    } catch (err: any) {
      toastApi.error(`Error: ${err?.message || err}`, "Submission Error");
      setLoaderIcon(false);
    }
  };

  /* =========================
     Dependants modal logic
     ========================= */

  const handleOpenDialog = (dependant?: DependantType | null) => {
    setCurrentDependant(
      dependant || {
        id: (formData.dependantsData?.length || 0) + 1,
        relationship: "",
        title: "",
        firstName: "",
        middleName: "",
        surname: "",
        idtypes: "",
        idnos: "",
        dob: "",
        gendere: "",
        countrye: "",
        cities: "",
      },
    );
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentDependant(null);
    setErrors({});
  };

  const handleSaveDependant = () => {
    const newErrors: Record<string, string> = {};

    if (!currentDependant?.relationship)
      newErrors.relationship = "Relationship is required";
    if (!currentDependant?.title) newErrors.title = "Title is required";
    if (!currentDependant?.firstName)
      newErrors.firstName = "First Name is required";
    if (!currentDependant?.middleName)
      newErrors.middleName = "Middle Name is required";
    if (!currentDependant?.surname) newErrors.surname = "Surname is required";
    if (!currentDependant?.dob) newErrors.dob = "Date of Birth is required";
    if (!currentDependant?.idtypes) newErrors.idtypes = "ID Type is required";
    if (!currentDependant?.idnos) newErrors.idnos = "ID Number is required";
    if (!currentDependant?.gendere) newErrors.gendere = "Gender is required";
    if (!currentDependant?.countrye) newErrors.countrye = "Country is required";
    if (!currentDependant?.cities) newErrors.cities = "City is required";

    setErrors(newErrors);
    if (Object.keys(newErrors).length) return;

    setFormData((prev) => {
      const exists = prev.dependantsData.some(
        (d) => d.id === currentDependant!.id,
      );

      return {
        ...prev,
        dependantsData: exists
          ? prev.dependantsData.map((d) =>
              d.id === currentDependant!.id ? { ...d, ...currentDependant } : d,
            )
          : [...(prev.dependantsData || []), currentDependant!],
      };
    });

    toastApi.success("Dependant saved", "Saved");
    handleCloseDialog();
  };

  const handleChangeDep = (e: any) => {
    const { name, value } = e.target;

    setCurrentDependant((prev: any) => {
      const updated = { ...prev, [name]: value };

      if (
        name === "dob" &&
        ["Spouse", "Parent"].includes(updated.relationship)
      ) {
        const selectedDate = new Date(value);
        const todayD = new Date();
        let age = todayD.getFullYear() - selectedDate.getFullYear();
        const hasHadBirthday =
          todayD.getMonth() > selectedDate.getMonth() ||
          (todayD.getMonth() === selectedDate.getMonth() &&
            todayD.getDate() >= selectedDate.getDate());
        const actualAge = hasHadBirthday ? age : age - 1;
        const isUnder18 = actualAge < 18;
        const isOver88 = updated.relationship === "Parent" && actualAge > 88;
        let dobError = "";

        if (isUnder18)
          dobError = `${updated.relationship} must be at least 18 years old.`;
        else if (isOver88) dobError = `Parent must not be older than 88 years.`;

        setIsAdultRelationshipEligible(!isUnder18 && !isOver88);
        setErrors((prevErrs) => ({ ...prevErrs, dob: dobError }));
      } else {
        setErrors((prevErrs) => ({ ...prevErrs, [name]: "" }));
      }

      return updated;
    });
  };

  /* =========================
     Beneficiary modal logic
     ========================= */

  const handleOpenBeneficiaryDialog = (
    beneficiary?: BeneficiaryType | null,
  ) => {
    setCurrentBeneficiary(
      beneficiary || {
        id: (formData.beneficiariesData?.length || 0) + 1,
        relationship: "",
        title: "",
        beneficiary_fullname: "",
        dob: "",
        phone_number: "",
        beneficiary_address: "",
        beneficiary_email: "",
      },
    );
    setOpenBeneficiaryDialog(true);
  };

  const handleCloseBeneficiaryDialog = () => {
    setOpenBeneficiaryDialog(false);
    setCurrentBeneficiary(null);
    setErrors({});
  };

  const handleSaveBeneficiary = () => {
    const newErrors: Record<string, string> = {};

    if (!currentBeneficiary?.relationship)
      newErrors.relationship = "Relationship is required";
    if (!currentBeneficiary?.title) newErrors.title = "Title is required";
    if (!currentBeneficiary?.beneficiary_fullname)
      newErrors.beneficiary_fullname = "Beneficiary Full Name is required";
    if (!currentBeneficiary?.dob) newErrors.dob = "Date of Birth is required";
    if (!currentBeneficiary?.phone_number)
      newErrors.phone_number = "Phone Number is required";
    if (!currentBeneficiary?.beneficiary_address)
      newErrors.beneficiary_address = "Beneficiary Address is required";
    if (!currentBeneficiary?.beneficiary_email)
      newErrors.beneficiary_email = "Beneficiary Email is required";

    setErrors(newErrors);
    if (Object.keys(newErrors).length) return;

    setFormData((prev) => {
      const exists = prev.beneficiariesData.some(
        (b) => b.id === currentBeneficiary!.id,
      );
      const updated = exists
        ? prev.beneficiariesData.map((b) =>
            b.id === currentBeneficiary!.id
              ? { ...b, ...currentBeneficiary }
              : b,
          )
        : [
            ...(prev.beneficiariesData || []),
            { ...currentBeneficiary!, id: prev.beneficiariesData.length + 1 },
          ];

      return { ...prev, beneficiariesData: updated };
    });

    toastApi.success("Beneficiary saved", "Saved");
    handleCloseBeneficiaryDialog();
  };

  const handleChangeBeneficiary = (e: any) => {
    const { name, value } = e.target;

    setCurrentBeneficiary((prev: any) => {
      const updated = { ...prev, [name]: value };

      if (
        name === "dob" &&
        ["Parent", "Child"].includes(updated.relationship)
      ) {
        const selectedDate = new Date(value);
        const todayD = new Date();
        let ageInMonths =
          (todayD.getFullYear() - selectedDate.getFullYear()) * 12 +
          (todayD.getMonth() - selectedDate.getMonth());

        if (todayD.getDate() < selectedDate.getDate()) ageInMonths--;

        let dobError = "";

        if (updated.relationship === "Parent" && ageInMonths > 1020) {
          dobError = "Parent must not be older than 88 years.";
          setIsAdultRelationshipEligible(false);
        }
        if (updated.relationship === "Child" && ageInMonths < 1) {
          dobError = "Child must be at least 1 month old.";
        }

        setErrors((prevErrs) => ({ ...prevErrs, dob: dobError }));
      } else {
        setErrors((prevErrs) => ({ ...prevErrs, [name]: "" }));
      }

      return updated;
    });
  };

  /* =========================
     Reset
     ========================= */

  const handleReset = () => {
    const generateMemberId = () => {
      const now = new Date();
      const uniqueNumber = `${now.getFullYear()}${now.getMonth() + 1}${now.getDate()}${now.getHours()}${now.getMinutes()}${now.getSeconds()}${now.getMilliseconds()}`;

      return `M${uniqueNumber.slice(-6)}`;
    };

    setFormData({
      memberidno: generateMemberId(),
      groupname: "Kenyans In South Wales",
      groupnumber: "KESWA",
      title: "",
      firstname: "",
      lastname: "",
      middlename: "",
      idtype: "",
      idno: "",
      dateofbirth: "",
      gender: "",
      country: "",
      city: "",
      address: "",
      mobileno: "",
      eimail: "",
      family_option: "",
      option: "",
      supportingDocuments: [],
      dependantsData: [],
      beneficiariesData: [],
      selectedOption: "",
      medical: false,
      principalAge: "",
      ageGroup: "",
      medicalOption: "",
      lastExpense: false,
      lastExpenseOptions: [],
    });

    setBeneficiaryCount(0);
    setDependentCount(0);
    setFileError(null);
    setErrors({});
    toastApi.info("Form reset to defaults", "Reset");
  };

  /* =========================
     Relationship constraints & UI flags
     ========================= */

  const relationshipCounts = (formData.dependantsData || []).reduce(
    (acc: any, dep: any) => {
      acc[dep.relationship] = (acc[dep.relationship] || 0) + 1;

      return acc;
    },
    {} as any,
  );

  const isNuclear = formData.family_option === "Nuclear Family";
  const isExtended = formData.family_option === "Extended Family";
  const isIndividual = formData.family_option === "Individual";

  const isSpouseLimitReached = (relationshipCounts["Spouse"] || 0) >= 1;
  const isChildLimitReached = (relationshipCounts["Child"] || 0) >= 4;
  const isSiblingLimitReached = (relationshipCounts["Sibling"] || 0) >= 4;
  const isParentLimitReached = (relationshipCounts["Parent"] || 0) >= 4;

  /* =========================
     Render
     ========================= */

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 flex items-center justify-center p-6">
      {/* Toast container */}
      <ToastContainer
        toasts={toasts}
        onDismiss={(id) => toastApi.dismiss(id)}
      />

      {/* Loader overlay */}
      {loaderIcon && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600" />
        </div>
      )}

      <Card className="w-full max-w-5xl shadow-2xl rounded-3xl overflow-hidden border border-gray-100">
        <CardHeader className="bg-gradient-to-r from-slate-50 to-white py-6 px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Image
                alt="logo"
                height={48}
                src="/images/logo.jpeg"
                width={160}
              />
              <div>
                <h3 className="text-lg font-semibold text-slate-800">
                  {formData.groupname || "Group"} Member Detail Forms
                </h3>
                <p className="text-sm text-slate-500">
                  High-end corporate registration — clean • secure • brand
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="bg-blue-50 text-blue-700 px-3 py-1 rounded-lg">
                {formData.groupnumber || "UNKNOWN"}
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardBody className="p-6 bg-white">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Top fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Member Reference Number
                </label>
                <Input readOnly className="mt-2" value={formData.memberidno} />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Group Name
                </label>
                <Input readOnly className="mt-2" value={formData.groupname} />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Group Number
                </label>
                <Input readOnly className="mt-2" value={formData.groupnumber} />
              </div>
            </div>

            {/* Personal details grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Title
                </label>
                <Select
                  className="mt-2"
                  selectedKeys={formData.title ? [formData.title] : []}
                  onSelectionChange={(keys) => {
                    const selected = Array.from(keys)[0] as string;

                    setFormData((p) => ({ ...p, title: selected }));
                  }}
                >
                  {["Mr", "Master", "Mrs", "Miss", "Ms", "Dr", "Prof"].map(
                    (t) => (
                      <SelectItem key={t}>{t}</SelectItem>
                    ),
                  )}
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">
                  First Name
                </label>
                <Input
                  className="mt-2"
                  name="firstname"
                  value={formData.firstname}
                  onChange={(e: any) => handleChange(e)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Last Name
                </label>
                <Input
                  className="mt-2"
                  name="lastname"
                  value={formData.lastname}
                  onChange={(e: any) => handleChange(e)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Middle Name
                </label>
                <Input
                  className="mt-2"
                  name="middlename"
                  value={formData.middlename}
                  onChange={(e: any) => handleChange(e)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Identification Type
                </label>
                <Select
                  className="mt-2"
                  selectedKeys={formData.idtype ? [formData.idtype] : []}
                  onSelectionChange={(keys) => {
                    const selected = Array.from(keys)[0] as string;

                    setFormData((p) => ({ ...p, idtype: selected }));
                  }}
                >
                  <SelectItem key="National ID">National ID</SelectItem>
                  <SelectItem key="Passport">Passport</SelectItem>
                  <SelectItem key="Birth Certificate">
                    Birth Certificate
                  </SelectItem>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Identification Number
                </label>
                <Input
                  className="mt-2"
                  name="idno"
                  value={formData.idno}
                  onChange={(e: any) => handleChange(e)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Date of Birth
                </label>
                <Input
                  className="mt-2"
                  name="dateofbirth"
                  type="date"
                  value={formData.dateofbirth}
                  onChange={(ev: any) => {
                    const v = ev.target.value;
                    const selectedDate = new Date(v);
                    const todayD = new Date();
                    let age = todayD.getFullYear() - selectedDate.getFullYear();
                    const has =
                      todayD.getMonth() > selectedDate.getMonth() ||
                      (todayD.getMonth() === selectedDate.getMonth() &&
                        todayD.getDate() >= selectedDate.getDate());
                    const actualAge = has ? age : age - 1;

                    if (actualAge < 18) {
                      toastApi.error("You must be at least 18 years old.");

                      return;
                    }
                    setFormData((prev) => ({ ...prev, dateofbirth: v }));
                  }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Gender
                </label>
                <Select
                  className="mt-2"
                  selectedKeys={formData.gender ? [formData.gender] : []}
                  onSelectionChange={(keys) => {
                    const selected = Array.from(keys)[0] as string;

                    setFormData((p) => ({ ...p, gender: selected }));
                  }}
                >
                  <SelectItem key="Male">Male</SelectItem>
                  <SelectItem key="Female">Female</SelectItem>
                  <SelectItem key="Others">Others</SelectItem>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Country Of Residence
                </label>
                <Select
                  className="mt-2"
                  selectedKeys={formData.country ? [formData.country] : []}
                  onSelectionChange={(keys) => {
                    const selected = Array.from(keys)[0] as string;

                    setFormData((p) => ({ ...p, country: selected }));
                  }}
                >
                  {countries.map((c) => (
                    <SelectItem key={c}>{c}</SelectItem>
                  ))}
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">
                  City Of Residence
                </label>
                <Input
                  className="mt-2"
                  name="city"
                  value={formData.city}
                  onChange={(e: any) => handleChange(e)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Physical / Postal Address
                </label>
                <Input
                  className="mt-2"
                  name="address"
                  value={formData.address}
                  onChange={(e: any) => handleChange(e)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Mobile Number
                </label>
                <div className="mt-2">
                  <PhoneInput
                    country={"ke"}
                    inputStyle={{ width: "100%", height: 44, borderRadius: 6 }}
                    value={formData.mobileno}
                    onChange={handlePhoneChange}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Email
                </label>
                <Input
                  className="mt-2"
                  name="eimail"
                  value={formData.eimail}
                  onChange={(e: any) => handleChange(e)}
                />
              </div>
            </div>

            {/* COVER OPTIONS CARD (medical & last expense) */}
            <div className="rounded-xl p-4 shadow-lg bg-gradient-to-b from-white to-slate-50 border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="text-lg font-semibold text-slate-800">
                    Cover Options
                  </h4>
                  <p className="text-sm text-slate-500">
                    Select optional covers and plans — modern, corporate rates
                    shown below.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Avatar className="bg-blue-50 text-blue-700" size="sm">
                    £
                  </Avatar>
                  <span className="text-sm text-slate-500">
                    Secure • Corporate • Clear pricing
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* ---------------------- MEDICAL ---------------------- */}
                <div className="col-span-1">
                  <label className="flex items-center gap-2">
                    <input
                      checked={!!formData.medical}
                      type="checkbox"
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          medical: e.target.checked,
                        }))
                      }
                    />
                    <span className="font-semibold">Medical</span>
                  </label>

                  {formData.medical && (
                    <div className="mt-3 space-y-2">
                      <Input
                        label="Principal's Age"
                        name="principalAge"
                        type="number"
                        value={String(formData.principalAge || "")}
                        onChange={(e: any) =>
                          setFormData((p) => ({
                            ...p,
                            principalAge: e.target.value,
                          }))
                        }
                      />
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          onClick={() =>
                            setFormData((p) => ({
                              ...p,
                              ageGroup: "<70",
                              medicalOption: "",
                            }))
                          }
                        >
                          &lt; 70
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() =>
                            setFormData((p) => ({
                              ...p,
                              ageGroup: ">70",
                              medicalOption: "",
                            }))
                          }
                        >
                          &gt; 70
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                {/* ---------------------- LAST EXPENSE ---------------------- */}
                <div className="col-span-1">
                  <label className="flex items-center gap-2">
                    <input
                      checked={!!formData.lastExpense}
                      type="checkbox"
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          lastExpense: e.target.checked,
                        }))
                      }
                    />
                    <span className="font-semibold">Last Expense</span>
                  </label>

                  {formData.lastExpense && (
                    <div className="mt-3 p-3 rounded-lg border border-blue-200 bg-blue-50/30">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-slate-800">
                            Family Cover — All-Inclusive
                          </div>
                          <div className="text-xs text-slate-500">
                            Covers principal, spouse, children, parents &
                            siblings
                          </div>
                        </div>
                        <div className="text-blue-700 font-semibold">
                          Kshs 31,800
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* ---------------------- SUMMARY ---------------------- */}
                <div className="col-span-1">
                  <div className="relative p-5 rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-red-600 text-white shadow-xl overflow-hidden">
                    {/* Subtle frosted overlay */}
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-2xl" />

                    <div className="relative z-10">
                      <h3 className="text-lg font-bold tracking-wide flex items-center gap-2 mb-4">
                        <svg
                          className="h-5 w-5 text-red-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13 16h-1v-4h-1m1-4h.01M12 12h.01"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                          />
                        </svg>
                        Summary
                      </h3>

                      <div className="space-y-3">
                        {/* Medical Option */}
                        <div className="flex items-center justify-between bg-white/10 rounded-lg px-3 py-2 shadow-sm hover:bg-white/20 transition-all duration-200">
                          <span className="text-sm text-white/90">
                            Selected Medical
                          </span>
                          <span className="font-semibold text-blue-200">
                            {formData.medicalOption || "None"}
                          </span>
                        </div>

                        {/* Last Expense Option */}
                        <div className="flex items-center justify-between bg-white/10 rounded-lg px-3 py-2 shadow-sm hover:bg-white/20 transition-all duration-200">
                          <span className="text-sm text-white/90">
                            Selected Last Expense
                          </span>
                          <span className="font-semibold text-red-200">
                            {formData.lastExpense
                              ? "Family Cover — All-Inclusive"
                              : "None"}
                          </span>
                        </div>

                        {/* Total Premium */}
                        {formData.totalPremium && (
                          <div className="mt-4 border-t border-white/20 pt-3 flex items-center justify-between">
                            <span className="text-sm text-white/80">
                              Total Premium
                            </span>
                            <span className="text-lg font-extrabold text-green-300 drop-shadow-sm">
                              Kshs {formData.totalPremium.toLocaleString()}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ---------------------- MEDICAL RATE TABLES ---------------------- */}
              {formData.medical && formData.ageGroup && (
                <div className="mt-6">
                  {formData.ageGroup === "<70" ? (
                    <>
                      <h5 className="font-semibold text-slate-700 mb-2">
                        Standard Rates
                      </h5>
                      <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                        <thead className="bg-blue-50">
                          <tr>
                            <th className="p-2 text-left font-semibold">
                              Plan
                            </th>
                            <th className="p-2 text-left font-semibold">
                              Premium
                            </th>
                            <th className="p-2 text-center font-semibold">
                              Select
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            { plan: "M", premium: "Kshs 28,000" },
                            { plan: "M+1", premium: "Kshs 42,000" },
                            { plan: "M+2", premium: "Kshs 50,400" },
                            { plan: "M+3", premium: "Kshs 58,800" },
                            { plan: "M+4", premium: "Kshs 67,200" },
                            { plan: "M+5", premium: "Kshs 75,600" },
                          ].map((row) => (
                            <tr
                              key={row.plan}
                              className="hover:bg-blue-50/40 transition-colors"
                            >
                              <td className="p-2 font-semibold">{row.plan}</td>
                              <td className="p-2 text-slate-600">
                                {row.premium}
                              </td>
                              <td className="p-2 text-center">
                                <input
                                  checked={
                                    formData.medicalOption ===
                                    `${row.plan} - ${row.premium}`
                                  }
                                  type="radio"
                                  onChange={() =>
                                    setFormData((prev) => ({
                                      ...prev,
                                      medicalOption: `${row.plan} - ${row.premium}`,
                                    }))
                                  }
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>

                      <div className="mt-3 bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded">
                        <p className="font-semibold text-yellow-800">Note:</p>
                        <ul className="list-disc list-inside text-sm text-slate-600">
                          <li>M means principal</li>
                          <li>M+1 means principal and one dependent</li>
                          <li>
                            Dependents can only be a spouse and/or children.
                          </li>
                        </ul>
                      </div>
                    </>
                  ) : (
                    <>
                      <h5 className="font-semibold text-slate-700 mb-2">
                        Seniors Rates
                      </h5>

                      {[
                        {
                          id: "A",
                          label: "Option A — 70-75 Years",
                          breakdown: [
                            { role: "Principal", amount: "Kshs 46,104" },
                            { role: "Spouse", amount: "Kshs 46,104" },
                            {
                              role: "Child (up to 25 years)",
                              amount: "Kshs 6,429",
                            },
                          ],
                        },
                        {
                          id: "B",
                          label: "Option B — 76-80 Years",
                          breakdown: [
                            { role: "Principal", amount: "Kshs 76,695" },
                            { role: "Spouse", amount: "Kshs 55,226" },
                            {
                              role: "Child (up to 25 years)",
                              amount: "Kshs 6,429",
                            },
                          ],
                        },
                      ].map((opt) => (
                        <div
                          key={opt.id}
                          className="border border-gray-100 bg-gradient-to-b from-white to-blue-50/20 rounded-lg p-3 mb-4"
                        >
                          <h6 className="font-semibold text-slate-800 mb-2">
                            {opt.label}
                          </h6>
                          <table className="w-full text-sm">
                            <thead className="bg-blue-50">
                              <tr>
                                <th className="p-2 text-left font-semibold">
                                  Category
                                </th>
                                <th className="p-2 text-left font-semibold">
                                  Premium
                                </th>
                                <th className="p-2 text-center font-semibold">
                                  Select
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {opt.breakdown.map((row) => {
                                const value = `${opt.label} - ${row.role} - ${row.amount}`;
                                const currentOptions = Array.isArray(
                                  formData.medicalOption,
                                )
                                  ? formData.medicalOption
                                  : [];
                                const checked = currentOptions.includes(value);

                                return (
                                  <tr
                                    key={row.role}
                                    className="hover:bg-blue-50/40"
                                  >
                                    <td className="p-2">{row.role}</td>
                                    <td className="p-2 text-slate-600">
                                      {row.amount}
                                    </td>
                                    <td className="p-2 text-center">
                                      <input
                                        checked={checked}
                                        type="checkbox"
                                        onChange={(e) => {
                                          setFormData((prev) => {
                                            const current = Array.isArray(
                                              prev.medicalOption,
                                            )
                                              ? prev.medicalOption
                                              : [];
                                            const set = new Set(current);

                                            if (e.target.checked)
                                              set.add(value);
                                            else set.delete(value);

                                            return {
                                              ...prev,
                                              medicalOption: Array.from(
                                                set,
                                              ) as string[],
                                            };
                                          });
                                        }}
                                      />
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      ))}
                    </>
                  )}

                  <div className="mt-4 p-3 rounded-lg bg-blue-50 border border-blue-200">
                    <span className="font-semibold text-blue-700">
                      Total Premium:{" "}
                    </span>
                    {totalPremium > 0 ? (
                      <span className="text-blue-700">
                        Kshs {totalPremium.toLocaleString()}
                      </span>
                    ) : (
                      <span className="text-slate-500">No selection yet</span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Dependants section */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xl font-semibold text-slate-800">
                  Dependant Details
                </h4>
                <div className="flex items-center gap-3">
                  <Button
                    onClick={() => {
                      if (formData.family_option !== "Individual") {
                        setDependentCount((p) => p + 1);
                        toastApi.success("New dependant slot created", "Added");
                      } else {
                        toastApi.error(
                          "Dependants are only allowed for Nuclear or Extended Family.",
                          "Not allowed",
                        );
                      }
                    }}
                  >
                    Add Dependant
                  </Button>
                </div>
              </div>

              {formData.family_option === "Individual" && (
                <div className="text-sm text-red-600 mb-3">
                  🚫 Dependants are only allowed for Nuclear or Extended Family
                  options.
                </div>
              )}

              <div className="overflow-x-auto rounded-xl border border-gray-100 shadow-sm mb-6">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                        No
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                        Relationship
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                        Full Name
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                        ID Type
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                        DOB
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                        Country
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {(formData.dependantsData || []).length === 0 ? (
                      <tr>
                        <td
                          className="text-center text-sm text-slate-500 py-6"
                          colSpan={7}
                        >
                          No dependants yet
                        </td>
                      </tr>
                    ) : (
                      (formData.dependantsData || []).map((d, idx) => (
                        <motion.tr
                          key={d.id || idx}
                          animate={{ opacity: 1, y: 0 }}
                          className="hover:bg-slate-50 cursor-pointer"
                          initial={{ opacity: 0, y: 6 }}
                          whileHover={{ scale: 1.01 }}
                          onClick={() => handleOpenDialog(d)}
                        >
                          <td className="px-4 py-3">{d.id}</td>
                          <td className="px-4 py-3">{d.relationship}</td>
                          <td className="px-4 py-3">{`${d.title || ""} ${d.firstName || ""} ${d.middleName || ""} ${d.surname || ""}`}</td>
                          <td className="px-4 py-3">{d.idtypes}</td>
                          <td className="px-4 py-3">{d.dob}</td>
                          <td className="px-4 py-3">{d.countrye}</td>
                          <td className="px-4 py-3">
                            <Button
                              variant="ghost"
                              onClick={(ev: any) => {
                                ev.stopPropagation();
                                handleOpenDialog(d);
                              }}
                            >
                              Edit
                            </Button>
                          </td>
                        </motion.tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Dependant Modal (HeroUI Modal with Framer Motion) */}
            <AnimatePresence>
              {openDialog && currentDependant && (
                <Modal isOpen={openDialog} onOpenChange={setOpenDialog}>
                  <ModalContent>
                    <motion.div
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 12 }}
                      initial={{ opacity: 0, y: 12 }}
                    >
                      <ModalHeader>
                        <div className="text-lg font-semibold">
                          Edit Dependant
                        </div>
                      </ModalHeader>
                      <ModalBody>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-sm font-medium text-slate-700">
                              Relationship
                            </label>
                            <Select
                              className="mt-2"
                              selectedKeys={
                                currentDependant.relationship
                                  ? [currentDependant.relationship]
                                  : []
                              }
                              onSelectionChange={(keys) => {
                                const selected = Array.from(keys)[0] as string;

                                handleChangeDep({
                                  target: {
                                    name: "relationship",
                                    value: selected,
                                  },
                                });
                              }}
                            >
                              <SelectItem
                                key="Spouse"
                                isDisabled={
                                  isSpouseLimitReached ||
                                  !isAdultRelationshipEligible
                                }
                              >
                                Spouse
                              </SelectItem>
                              <SelectItem
                                key="Parent"
                                isDisabled={
                                  isNuclear ||
                                  isParentLimitReached ||
                                  !isAdultRelationshipEligible
                                }
                              >
                                Parent
                              </SelectItem>
                              <SelectItem
                                key="Child"
                                isDisabled={isChildLimitReached}
                              >
                                Child
                              </SelectItem>
                              <SelectItem
                                key="Sibling"
                                isDisabled={isNuclear || isSiblingLimitReached}
                              >
                                Sibling
                              </SelectItem>
                            </Select>
                            {errors.relationship && (
                              <div className="text-sm text-red-600 mt-1">
                                {errors.relationship}
                              </div>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-slate-700">
                              Title
                            </label>
                            <Select
                              className="mt-2"
                              selectedKeys={
                                currentDependant.title
                                  ? [currentDependant.title]
                                  : []
                              }
                              onSelectionChange={(keys) => {
                                const selected = Array.from(keys)[0] as string;

                                handleChangeDep({
                                  target: { name: "title", value: selected },
                                });
                              }}
                            >
                              {[
                                "Mr",
                                "Master",
                                "Mrs",
                                "Miss",
                                "Ms",
                                "Dr",
                                "Prof",
                              ].map((t) => (
                                <SelectItem key={t}>{t}</SelectItem>
                              ))}
                            </Select>
                            {errors.title && (
                              <div className="text-sm text-red-600 mt-1">
                                {errors.title}
                              </div>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-slate-700">
                              First Name
                            </label>
                            <Input
                              className="mt-2"
                              name="firstName"
                              value={currentDependant.firstName || ""}
                              onChange={(ev: any) =>
                                handleChangeDep({
                                  target: {
                                    name: "firstName",
                                    value: ev.target.value,
                                  },
                                })
                              }
                            />
                            {errors.firstName && (
                              <div className="text-sm text-red-600 mt-1">
                                {errors.firstName}
                              </div>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-slate-700">
                              Middle Name
                            </label>
                            <Input
                              className="mt-2"
                              name="middleName"
                              value={currentDependant.middleName || ""}
                              onChange={(ev: any) =>
                                handleChangeDep({
                                  target: {
                                    name: "middleName",
                                    value: ev.target.value,
                                  },
                                })
                              }
                            />
                            {errors.middleName && (
                              <div className="text-sm text-red-600 mt-1">
                                {errors.middleName}
                              </div>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-slate-700">
                              Surname
                            </label>
                            <Input
                              className="mt-2"
                              name="surname"
                              value={currentDependant.surname || ""}
                              onChange={(ev: any) =>
                                handleChangeDep({
                                  target: {
                                    name: "surname",
                                    value: ev.target.value,
                                  },
                                })
                              }
                            />
                            {errors.surname && (
                              <div className="text-sm text-red-600 mt-1">
                                {errors.surname}
                              </div>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-slate-700">
                              ID Type
                            </label>
                            <Select
                              className="mt-2"
                              selectedKeys={
                                currentDependant.idtypes
                                  ? [currentDependant.idtypes]
                                  : []
                              }
                              onSelectionChange={(keys) => {
                                const selected = Array.from(keys)[0] as string;

                                handleChangeDep({
                                  target: { name: "idtypes", value: selected },
                                });
                              }}
                            >
                              <SelectItem key="National ID">
                                National ID
                              </SelectItem>
                              <SelectItem key="Passport">Passport</SelectItem>
                              <SelectItem key="Birth Certificate">
                                Birth Certificate
                              </SelectItem>
                            </Select>
                            {errors.idtypes && (
                              <div className="text-sm text-red-600 mt-1">
                                {errors.idtypes}
                              </div>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-slate-700">
                              ID Number
                            </label>
                            <Input
                              className="mt-2"
                              name="idnos"
                              value={currentDependant.idnos || ""}
                              onChange={(ev: any) =>
                                handleChangeDep({
                                  target: {
                                    name: "idnos",
                                    value: ev.target.value,
                                  },
                                })
                              }
                            />
                            {errors.idnos && (
                              <div className="text-sm text-red-600 mt-1">
                                {errors.idnos}
                              </div>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-slate-700">
                              DOB
                            </label>
                            <Input
                              className="mt-2"
                              max={today}
                              name="dob"
                              type="date"
                              value={currentDependant.dob || ""}
                              onChange={(ev: any) =>
                                handleChangeDep({
                                  target: {
                                    name: "dob",
                                    value: ev.target.value,
                                  },
                                })
                              }
                            />
                            {errors.dob && (
                              <div className="text-sm text-red-600 mt-1">
                                {errors.dob}
                              </div>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-slate-700">
                              Gender
                            </label>
                            <Select
                              className="mt-2"
                              selectedKeys={
                                currentDependant.gendere
                                  ? [currentDependant.gendere]
                                  : []
                              }
                              onSelectionChange={(keys) => {
                                const selected = Array.from(keys)[0] as string;

                                handleChangeDep({
                                  target: { name: "gendere", value: selected },
                                });
                              }}
                            >
                              <SelectItem key="Male">Male</SelectItem>
                              <SelectItem key="Female">Female</SelectItem>
                            </Select>
                            {errors.gendere && (
                              <div className="text-sm text-red-600 mt-1">
                                {errors.gendere}
                              </div>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-slate-700">
                              Country
                            </label>
                            <Select
                              className="mt-2"
                              selectedKeys={
                                currentDependant.countrye
                                  ? [currentDependant.countrye]
                                  : []
                              }
                              onSelectionChange={(keys) => {
                                const selected = Array.from(keys)[0] as string;

                                handleChangeDep({
                                  target: { name: "countrye", value: selected },
                                });
                              }}
                            >
                              {countries.map((c) => (
                                <SelectItem key={c}>{c}</SelectItem>
                              ))}
                            </Select>
                            {errors.countrye && (
                              <div className="text-sm text-red-600 mt-1">
                                {errors.countrye}
                              </div>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-slate-700">
                              City
                            </label>
                            <Input
                              className="mt-2"
                              name="cities"
                              value={currentDependant.cities || ""}
                              onChange={(ev: any) =>
                                handleChangeDep({
                                  target: {
                                    name: "cities",
                                    value: ev.target.value,
                                  },
                                })
                              }
                            />
                            {errors.cities && (
                              <div className="text-sm text-red-600 mt-1">
                                {errors.cities}
                              </div>
                            )}
                          </div>
                        </div>
                      </ModalBody>
                      <ModalFooter>
                        <Button variant="ghost" onPress={handleCloseDialog}>
                          Cancel
                        </Button>
                        <Button onPress={handleSaveDependant}>Save</Button>
                      </ModalFooter>
                    </motion.div>
                  </ModalContent>
                </Modal>
              )}
            </AnimatePresence>

            {/* Beneficiaries */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xl font-semibold text-slate-800">
                  Beneficiary / Next of Kin Details
                </h4>
                <div>
                  <Button
                    onClick={() => {
                      if (formData.family_option !== "Individual") {
                        setBeneficiaryCount((p) => p + 1);
                        toastApi.success(
                          "New beneficiary slot created",
                          "Added",
                        );
                      } else {
                        toastApi.error(
                          "Beneficiaries are only allowed for Nuclear or Extended Family.",
                          "Not allowed",
                        );
                      }
                    }}
                  >
                    Add Beneficiary
                  </Button>
                </div>
              </div>

              {formData.family_option === "Individual" && (
                <div className="text-sm text-red-600 mb-3">
                  🚫 Beneficiaries are only allowed for Nuclear or Extended
                  Family options.
                </div>
              )}

              <div className="overflow-x-auto rounded-xl border border-gray-100 shadow-sm">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                        No
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                        Relationship
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                        Full Name
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                        DOB
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                        Phone
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                        Email
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {(formData.beneficiariesData || []).length === 0 ? (
                      <tr>
                        <td
                          className="text-center text-sm text-slate-500 py-6"
                          colSpan={7}
                        >
                          No beneficiaries yet
                        </td>
                      </tr>
                    ) : (
                      (formData.beneficiariesData || []).map((b, idx) => (
                        <motion.tr
                          key={b.id || idx}
                          animate={{ opacity: 1, y: 0 }}
                          className="hover:bg-slate-50 cursor-pointer"
                          initial={{ opacity: 0, y: 6 }}
                          whileHover={{ scale: 1.01 }}
                          onClick={() => handleOpenBeneficiaryDialog(b)}
                        >
                          <td className="px-4 py-3">{b.id}</td>
                          <td className="px-4 py-3">{b.relationship}</td>
                          <td className="px-4 py-3">
                            {b.beneficiary_fullname}
                          </td>
                          <td className="px-4 py-3">{b.dob}</td>
                          <td className="px-4 py-3">{b.phone_number}</td>
                          <td className="px-4 py-3">{b.beneficiary_email}</td>
                          <td className="px-4 py-3">
                            <Button
                              variant="ghost"
                              onClick={(ev: any) => {
                                ev.stopPropagation();
                                handleOpenBeneficiaryDialog(b);
                              }}
                            >
                              Edit
                            </Button>
                          </td>
                        </motion.tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Beneficiary Modal */}
            <AnimatePresence>
              {openBeneficiaryDialog && currentBeneficiary && (
                <Modal
                  isOpen={openBeneficiaryDialog}
                  onOpenChange={setOpenBeneficiaryDialog}
                >
                  <ModalContent>
                    <motion.div
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 12 }}
                      initial={{ opacity: 0, y: 12 }}
                    >
                      <ModalHeader>
                        <div className="text-lg font-semibold">
                          Edit Beneficiary
                        </div>
                      </ModalHeader>
                      <ModalBody>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-sm font-medium text-slate-700">
                              Relationship
                            </label>
                            <Select
                              className="mt-2"
                              selectedKeys={
                                currentBeneficiary.relationship
                                  ? [currentBeneficiary.relationship]
                                  : []
                              }
                              onSelectionChange={(keys) => {
                                const selected = Array.from(keys)[0] as string;

                                handleChangeBeneficiary({
                                  target: {
                                    name: "relationship",
                                    value: selected,
                                  },
                                });
                              }}
                            >
                              <SelectItem key="Spouse">Spouse</SelectItem>
                              <SelectItem key="Parent">Parent</SelectItem>
                              <SelectItem key="Child">Child</SelectItem>
                              <SelectItem key="Sibling">Sibling</SelectItem>
                              <SelectItem key="Other">Other</SelectItem>
                            </Select>
                            {errors.relationship && (
                              <div className="text-sm text-red-600 mt-1">
                                {errors.relationship}
                              </div>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-slate-700">
                              Title
                            </label>
                            <Select
                              className="mt-2"
                              selectedKeys={
                                currentBeneficiary.title
                                  ? [currentBeneficiary.title]
                                  : []
                              }
                              onSelectionChange={(keys) => {
                                const selected = Array.from(keys)[0] as string;

                                handleChangeBeneficiary({
                                  target: { name: "title", value: selected },
                                });
                              }}
                            >
                              {[
                                "Mr",
                                "Master",
                                "Mrs",
                                "Miss",
                                "Ms",
                                "Dr",
                                "Prof",
                              ].map((t) => (
                                <SelectItem key={t}>{t}</SelectItem>
                              ))}
                            </Select>
                            {errors.title && (
                              <div className="text-sm text-red-600 mt-1">
                                {errors.title}
                              </div>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-slate-700">
                              Beneficiary Full Name
                            </label>
                            <Input
                              className="mt-2"
                              value={
                                currentBeneficiary.beneficiary_fullname || ""
                              }
                              onChange={(ev: any) =>
                                handleChangeBeneficiary({
                                  target: {
                                    name: "beneficiary_fullname",
                                    value: ev.target.value,
                                  },
                                })
                              }
                            />
                            {errors.beneficiary_fullname && (
                              <div className="text-sm text-red-600 mt-1">
                                {errors.beneficiary_fullname}
                              </div>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-slate-700">
                              DOB
                            </label>
                            <Input
                              className="mt-2"
                              max={today}
                              type="date"
                              value={currentBeneficiary.dob || ""}
                              onChange={(ev: any) =>
                                handleChangeBeneficiary({
                                  target: {
                                    name: "dob",
                                    value: ev.target.value,
                                  },
                                })
                              }
                            />
                            {errors.dob && (
                              <div className="text-sm text-red-600 mt-1">
                                {errors.dob}
                              </div>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-slate-700">
                              Phone Number
                            </label>
                            <Input
                              className="mt-2"
                              value={currentBeneficiary.phone_number || ""}
                              onChange={(ev: any) =>
                                handleChangeBeneficiary({
                                  target: {
                                    name: "phone_number",
                                    value: ev.target.value,
                                  },
                                })
                              }
                            />
                            {errors.phone_number && (
                              <div className="text-sm text-red-600 mt-1">
                                {errors.phone_number}
                              </div>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-slate-700">
                              Beneficiary Address
                            </label>
                            <Input
                              className="mt-2"
                              value={
                                currentBeneficiary.beneficiary_address || ""
                              }
                              onChange={(ev: any) =>
                                handleChangeBeneficiary({
                                  target: {
                                    name: "beneficiary_address",
                                    value: ev.target.value,
                                  },
                                })
                              }
                            />
                            {errors.beneficiary_address && (
                              <div className="text-sm text-red-600 mt-1">
                                {errors.beneficiary_address}
                              </div>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-slate-700">
                              Beneficiary Email
                            </label>
                            <Input
                              className="mt-2"
                              value={currentBeneficiary.beneficiary_email || ""}
                              onChange={(ev: any) =>
                                handleChangeBeneficiary({
                                  target: {
                                    name: "beneficiary_email",
                                    value: ev.target.value,
                                  },
                                })
                              }
                            />
                            {errors.beneficiary_email && (
                              <div className="text-sm text-red-600 mt-1">
                                {errors.beneficiary_email}
                              </div>
                            )}
                          </div>
                        </div>
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          variant="ghost"
                          onPress={handleCloseBeneficiaryDialog}
                        >
                          Cancel
                        </Button>
                        <Button onPress={handleSaveBeneficiary}>Save</Button>
                      </ModalFooter>
                    </motion.div>
                  </ModalContent>
                </Modal>
              )}
            </AnimatePresence>

            {/* Submit & Reset */}
            <div className="flex items-center justify-center gap-6 mt-8">
              <Button
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl shadow-lg"
                type="submit"
              >
                Submit
              </Button>
              <Button
                className="px-8 py-3 rounded-xl bg-red-50 text-red-700 hover:bg-red-100"
                onClick={handleReset}
              >
                Reset
              </Button>
            </div>

            {/* Payment status small hints */}
            <div className="text-center mt-3">
              {paymentPending && (
                <motion.p
                  animate={{ opacity: 1 }}
                  className="text-blue-600"
                  initial={{ opacity: 0 }}
                >
                  Waiting for payment confirmation… Please check your phone 📱
                </motion.p>
              )}
              {paymentConfirmed && (
                <motion.p
                  animate={{ opacity: 1 }}
                  className="text-green-600"
                  initial={{ opacity: 0 }}
                >
                  Payment confirmed ✅ Submitting form…
                </motion.p>
              )}
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default KenyansInJapanMemberForm;
