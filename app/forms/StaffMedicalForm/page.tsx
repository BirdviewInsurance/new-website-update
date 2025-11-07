"use client";

import React, { useState, useEffect } from "react";
import {
  Input,
  Button,
  Select,
  SelectItem,
  Card,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  toast,
} from "@heroui/react";
import Image from "next/image";
import PhoneInput from "react-phone-input-2";
import { motion, AnimatePresence } from "framer-motion";
import "react-phone-input-2/lib/style.css";

interface DependantType {
  id: string | number;
  relationship: string;
  title: string;
  firstName: string;
  middleName: string;
  surname: string;
  idtypes: string;
  idnos: string;
  dob: string;
  gendere: string;
}

export interface FormdataType {
  policyScheme: string;
  relationship: string;
  staffId: string;
  title: string;
  firstname: string;
  middleName: string;
  lastname: string;
  idtype: string;
  idno: string;
  dateofbirth: string;
  gender: string;
  country: string;
  city: string;
  address: string;
  mobileno: string;
  eimail: string;
  dependantsData: DependantType[];
}

export interface ErrorsType {
  [key: string]: string;
}

const StaffMedicalForm: React.FC = () => {
  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState<FormdataType>({
    policyScheme: "Birdview Microinsurance Medical Scheme",
    relationship: "Principal",
    staffId: "",
    title: "",
    firstname: "",
    middleName: "",
    lastname: "",
    idtype: "",
    idno: "",
    dateofbirth: "",
    gender: "",
    country: "Kenya",
    city: "",
    address: "",
    mobileno: "",
    eimail: "",
    dependantsData: [
      {
        id: 1,
        relationship: "",
        title: "",
        firstName: "",
        middleName: "",
        surname: "",
        idtypes: "",
        idnos: "",
        dob: "",
        gendere: "",
      },
    ],
  });

  const [loaderIcon, setLoaderIcon] = useState(false);
  const [dependentCount, setDependentCount] = useState(1);
  const [errors, setErrors] = useState<ErrorsType>({});
  const [currentDependant, setCurrentDependant] = useState<DependantType | null>(null);
  const [openModal, setOpenModal] = useState(false);

  // Sync dependants count
  useEffect(() => {
    setFormData((prev) => {
      const newDependants = Array.from({ length: dependentCount }, (_, idx) => {
        return prev.dependantsData[idx] || {
          id: idx + 1,
          relationship: "",
          title: "",
          firstName: "",
          middleName: "",
          surname: "",
          idtypes: "",
          idnos: "",
          dob: "",
          gendere: "",
        };
      });
      return { ...prev, dependantsData: newDependants };
    });
  }, [dependentCount]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (value: string) => {
    setFormData((prev) => ({ ...prev, mobileno: value }));
  };

  const handleAddDependant = () => {
    if (formData.dependantsData.length >= 7) {
      (toast as any).error("You can only add up to 7 dependants.");
      return;
    }
    setDependentCount((prev) => prev + 1);
  };

  const handleOpenModal = (dep: DependantType) => {
    setCurrentDependant(dep);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setCurrentDependant(null);
    setErrors({});
    setOpenModal(false);
  };

  const handleChangeDep = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | { name: string; value: string }
  ) => {
    if ("target" in e) {
      const { name, value } = e.target;
      setCurrentDependant((prev) => prev && { ...prev, [name]: value });
      setErrors((prev) => ({ ...prev, [name]: "" }));
    } else {
      const { name, value } = e;
      setCurrentDependant((prev) => prev && { ...prev, [name]: value });
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSaveDependant = () => {
    if (!currentDependant) return;
    const newErrors: ErrorsType = {};
    ["relationship", "title", "firstName", "middleName", "surname", "idtypes", "idnos", "dob", "gendere"].forEach(
      (key) => {
        if (!(currentDependant as any)[key]) newErrors[key] = `${key} is required`;
      }
    );
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setFormData((prev) => ({
      ...prev,
      dependantsData: prev.dependantsData.map((d) =>
        d.id === currentDependant.id ? currentDependant : d
      ),
    }));
    handleCloseModal();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoaderIcon(true);
    try {
      const res = await fetch("/api/medicalStaff_form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        (toast as any).success(data?.message || "Form submitted successfully");
        handleReset();
      } else {
        (toast as any).error(data?.error || "Something went wrong");
      }
    } catch (err: any) {
      (toast as any).error(err?.message || "Network error. Please try again.");
    } finally {
      setLoaderIcon(false);
    }
  };

  const handleReset = () => {
    setFormData({
      policyScheme: "Birdview Microinsurance Medical Scheme",
      relationship: "Principal",
      staffId: "",
      title: "",
      firstname: "",
      middleName: "",
      lastname: "",
      idtype: "",
      idno: "",
      dateofbirth: "",
      gender: "",
      country: "Kenya",
      city: "",
      address: "",
      mobileno: "",
      eimail: "",
      dependantsData: [
        {
          id: 1,
          relationship: "",
          title: "",
          firstName: "",
          middleName: "",
          surname: "",
          idtypes: "",
          idnos: "",
          dob: "",
          gendere: "",
        },
      ],
    });
    setDependentCount(1);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 
             bg-[url('/images/backdrop2.png')] bg-cover bg-center bg-no-repeat"
    >
      {loaderIcon && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      )}

      <Card className="w-full max-w-3xl shadow-xl rounded-2xl p-6">
        <div className="flex justify-center my-4">
          <Image src="/images/logo.jpeg" alt="Logo" width={180} height={50} />
        </div>
        <h2 className="text-xl font-bold text-center mb-6">
          Staff Medical Detail Forms
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input label="Policy Scheme" value={formData.policyScheme} disabled />
            <Input label="Relationship" value={formData.relationship} disabled />
            <Input
              label="Staff ID"
              name="staffId"
              value={formData.staffId}
              onChange={handleChange}
              required
            />
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select
              label="Title"
              name="title"
              selectedKeys={formData.title ? [formData.title] : []}
              onSelectionChange={(keys) => {
                const selected = Array.from(keys)[0] as string;
                handleChange({ target: { name: "title", value: selected } } as any);
              }}
            >
              {["Mr", "Mrs", "Miss", "Ms", "Dr", "Prof"].map((t) => (
                <SelectItem key={t}>
                  {t}
                </SelectItem>
              ))}
            </Select>
            <Input
              label="First Name"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              required
            />
            <Input
              label="Middle Name"
              name="middleName"
              value={formData.middleName}
              onChange={handleChange}
            />
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Last Name"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              required
            />
            <Select
              label="ID Type"
              name="idtype"
              selectedKeys={formData.idtype ? [formData.idtype] : []}
              onSelectionChange={(keys) => {
                const selected = Array.from(keys)[0] as string;
                handleChange({ target: { name: "idtype", value: selected } } as any);
              }}
              required
            >
              {["National ID", "Passport", "Birth Certificate"].map((t) => (
                <SelectItem key={t}>
                  {t}
                </SelectItem>
              ))}
            </Select>
            <Input
              label="ID Number"
              name="idno"
              value={formData.idno}
              onChange={handleChange}
            />
          </div>

          {/* Row 4 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              type="date"
              label="Date of Birth"
              name="dateofbirth"
              value={formData.dateofbirth}
              onChange={handleChange}
              max={today}
              required
            />
            <Select
              label="Gender"
              name="gender"
              selectedKeys={formData.gender ? [formData.gender] : []}
              onSelectionChange={(keys) => {
                const selected = Array.from(keys)[0] as string;
                handleChange({ target: { name: "gender", value: selected } } as any);
              }}
              required
            >
              {["Male", "Female", "Others"].map((g) => (
                <SelectItem key={g}>
                  {g}
                </SelectItem>
              ))}
            </Select>
            <Input label="Country" value={formData.country} disabled />
          </div>

          {/* Row 5 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
            <Input
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
            <PhoneInput
              country="ke"
              value={formData.mobileno}
              onChange={handlePhoneChange}
              inputStyle={{ width: "100%", height: "57px", borderRadius: "8px" }}
              inputProps={{ name: "mobileno", required: true }}
            />
          </div>

          {/* Row 6 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Email"
              name="eimail"
              value={formData.eimail}
              onChange={handleChange}
            />
          </div>

          <div className="flex justify-between items-center mt-4">
            <h3 className="font-semibold text-lg">Dependant Details</h3>
            <Button
              type="button"
              color="primary"
              onClick={handleAddDependant}
              className="text-white font-semibold px-4 py-2 rounded-lg shadow-md"
              disabled={formData.dependantsData.length >= 7}
            >
              Add Dependant
            </Button>
          </div>

          {formData.dependantsData.map((dep) => (
            <Button
              type="button"
              key={dep.id}
              onClick={() => handleOpenModal(dep)}
              variant="flat"
              className="my-2"
            >
              Edit Dependant {dep.id}
            </Button>
          ))}

          <div className="flex space-x-4 mt-6">
            <Button type="submit" color="primary" className="text-white font-semibold px-10 py-3 rounded-lg shadow-md">
              Submit
            </Button>
            <Button type="button" color="danger" className="text-white font-semibold px-10 py-3 rounded-lg shadow-md" onClick={handleReset}>
              Reset
            </Button>
          </div>
        </form>
      </Card>

      {/* Dependant Modal with slide-in + fade + delete */}
      <AnimatePresence>
        {openModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black /50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="w-full max-w-lg"
            >
              <Modal isOpen={openModal} onOpenChange={setOpenModal} size="lg">
                <ModalContent>
                  <ModalHeader className="text-lg font-semibold flex justify-between items-center">
                    Edit Dependant
                    {currentDependant && (
                      <Button
                        size="sm"
                        color="danger"
                        className="mr-2 text-white font-semibold px-4 py-2 rounded-lg shadow-md"
                        onPress={() => {
                          setFormData((prev) => ({
                            ...prev,
                            dependantsData: prev.dependantsData.filter(
                              (d) => d.id !== currentDependant.id
                            ),
                          }));
                          handleCloseModal();
                        }}
                      >
                        Delete
                      </Button>
                    )}
                  </ModalHeader>

                  <ModalBody className="max-h-[70vh] overflow-y-auto">
                    {currentDependant && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Select
                          label="Relationship"
                          selectedKeys={currentDependant.relationship ? [currentDependant.relationship] : []}
                          onSelectionChange={(keys) => {
                            const selected = Array.from(keys)[0] as string;
                            handleChangeDep({ name: "relationship", value: selected });
                          }}
                        >
                          {["Spouse", "Parent", "Child", "Sibling", "Next Of Kin"].map((r) => (
                            <SelectItem key={r}>{r}</SelectItem>
                          ))}
                        </Select>

                        <Select
                          label="Title"
                          selectedKeys={currentDependant.title ? [currentDependant.title] : []}
                          onSelectionChange={(keys) =>
                            handleChangeDep({
                              name: "title",
                              value: Array.from(keys)[0] as string,
                            })
                          }
                        >
                          {["Mr", "Mrs", "Miss", "Dr", "Prof", "Ms", "Master"].map(
                            (t) => (
                              <SelectItem key={t}>
                                {t}
                              </SelectItem>
                            )
                          )}
                        </Select>

                        <Input
                          label="First Name"
                          name="firstName"
                          value={currentDependant.firstName}
                          onChange={handleChangeDep}
                          errorMessage={errors.firstName}
                        />

                        <Input
                          label="Middle Name"
                          name="middleName"
                          value={currentDependant.middleName}
                          onChange={handleChangeDep}
                          errorMessage={errors.middleName}
                        />

                        <Input
                          label="Surname"
                          name="surname"
                          value={currentDependant.surname}
                          onChange={handleChangeDep}
                          errorMessage={errors.surname}
                        />

                        <Select
                          label="ID Type"
                          selectedKeys={currentDependant.idtypes ? [currentDependant.idtypes] : []}
                          onSelectionChange={(keys) =>
                            handleChangeDep({
                              name: "idtypes",
                              value: Array.from(keys)[0] as string,
                            })
                          }
                        >
                          {["National ID", "Passport", "Birth Certificate"].map(
                            (t) => (
                              <SelectItem key={t}>
                                {t}
                              </SelectItem>
                            )
                          )}
                        </Select>

                        <Input
                          label="ID Number"
                          name="idnos"
                          value={currentDependant.idnos}
                          onChange={handleChangeDep}
                          errorMessage={errors.idnos}
                        />

                        <Input
                          label="DOB"
                          name="dob"
                          type="date"
                          value={currentDependant.dob}
                          onChange={handleChangeDep}
                          max={today}
                          errorMessage={errors.dob}
                        />

                        <Select
                          label="Gender"
                          selectedKeys={currentDependant.gendere ? [currentDependant.gendere] : []}
                          onSelectionChange={(keys) =>
                            handleChangeDep({
                              name: "gendere",
                              value: Array.from(keys)[0] as string,
                            })
                          }
                        >
                          {["Male", "Female"].map((g) => (
                            <SelectItem key={g}>
                              {g}
                            </SelectItem>
                          ))}
                        </Select>
                      </div>
                    )}
                  </ModalBody>

                  <ModalFooter>
                    <Button variant="light" onPress={handleCloseModal}>
                      Cancel
                    </Button>
                    <Button color="primary" onPress={handleSaveDependant}>
                      Save
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StaffMedicalForm;
