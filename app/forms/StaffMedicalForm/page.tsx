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
  const [currentDependant, setCurrentDependant] =
    useState<DependantType | null>(null);
  const [openModal, setOpenModal] = useState(false);

  // Sync dependants count
  useEffect(() => {
    setFormData((prev) => {
      const newDependants = Array.from({ length: dependentCount }, (_, idx) => {
        return (
          prev.dependantsData[idx] || {
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
          }
        );
      });

      return { ...prev, dependantsData: newDependants };
    });
  }, [dependentCount]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
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
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
      | { name: string; value: string },
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

    [
      "relationship",
      "title",
      "firstName",
      "middleName",
      "surname",
      "idtypes",
      "idnos",
      "dob",
      "gendere",
    ].forEach((key) => {
      if (!(currentDependant as any)[key])
        newErrors[key] = `${key} is required`;
    });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);

      return;
    }
    setFormData((prev) => ({
      ...prev,
      dependantsData: prev.dependantsData.map((d) =>
        d.id === currentDependant.id ? currentDependant : d,
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
        </div>
      )}

      <Card className="w-full max-w-3xl shadow-xl rounded-2xl p-6">
        <div className="flex justify-center my-4">
          <Image alt="Logo" height={50} src="/images/logo.jpeg" width={180} />
        </div>
        <h2 className="text-xl font-bold text-center mb-6">
          Staff Medical Detail Forms
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              disabled
              label="Policy Scheme"
              value={formData.policyScheme}
            />
            <Input
              disabled
              label="Relationship"
              value={formData.relationship}
            />
            <Input
              required
              label="Staff ID"
              name="staffId"
              value={formData.staffId}
              onChange={handleChange}
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

                handleChange({
                  target: { name: "title", value: selected },
                } as any);
              }}
            >
              {["Mr", "Mrs", "Miss", "Ms", "Dr", "Prof"].map((t) => (
                <SelectItem key={t}>{t}</SelectItem>
              ))}
            </Select>
            <Input
              required
              label="First Name"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
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
              required
              label="Last Name"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
            />
            <Select
              required
              label="ID Type"
              name="idtype"
              selectedKeys={formData.idtype ? [formData.idtype] : []}
              onSelectionChange={(keys) => {
                const selected = Array.from(keys)[0] as string;

                handleChange({
                  target: { name: "idtype", value: selected },
                } as any);
              }}
            >
              {["National ID", "Passport", "Birth Certificate"].map((t) => (
                <SelectItem key={t}>{t}</SelectItem>
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
              required
              label="Date of Birth"
              max={today}
              name="dateofbirth"
              type="date"
              value={formData.dateofbirth}
              onChange={handleChange}
            />
            <Select
              required
              label="Gender"
              name="gender"
              selectedKeys={formData.gender ? [formData.gender] : []}
              onSelectionChange={(keys) => {
                const selected = Array.from(keys)[0] as string;

                handleChange({
                  target: { name: "gender", value: selected },
                } as any);
              }}
            >
              {["Male", "Female", "Others"].map((g) => (
                <SelectItem key={g}>{g}</SelectItem>
              ))}
            </Select>
            <Input disabled label="Country" value={formData.country} />
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
              inputProps={{ name: "mobileno", required: true }}
              inputStyle={{
                width: "100%",
                height: "57px",
                borderRadius: "8px",
              }}
              value={formData.mobileno}
              onChange={handlePhoneChange}
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
              className="text-white font-semibold px-4 py-2 rounded-lg shadow-md"
              color="primary"
              disabled={formData.dependantsData.length >= 7}
              type="button"
              onClick={handleAddDependant}
            >
              Add Dependant
            </Button>
          </div>

          {formData.dependantsData.map((dep) => (
            <Button
              key={dep.id}
              className="my-2"
              type="button"
              variant="flat"
              onClick={() => handleOpenModal(dep)}
            >
              Edit Dependant {dep.id}
            </Button>
          ))}

          <div className="flex space-x-4 mt-6">
            <Button
              className="text-white font-semibold px-10 py-3 rounded-lg shadow-md"
              color="primary"
              type="submit"
            >
              Submit
            </Button>
            <Button
              className="text-white font-semibold px-10 py-3 rounded-lg shadow-md"
              color="danger"
              type="button"
              onClick={handleReset}
            >
              Reset
            </Button>
          </div>
        </form>
      </Card>

      {/* Dependant Modal with slide-in + fade + delete */}
      <AnimatePresence>
        {openModal && (
          <motion.div
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black /50"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
          >
            <motion.div
              animate={{ y: 0, opacity: 1 }}
              className="w-full max-w-lg"
              exit={{ y: 100, opacity: 0 }}
              initial={{ y: 100, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <Modal isOpen={openModal} size="lg" onOpenChange={setOpenModal}>
                <ModalContent>
                  <ModalHeader className="text-lg font-semibold flex justify-between items-center">
                    Edit Dependant
                    {currentDependant && (
                      <Button
                        className="mr-2 text-white font-semibold px-4 py-2 rounded-lg shadow-md"
                        color="danger"
                        size="sm"
                        onPress={() => {
                          setFormData((prev) => ({
                            ...prev,
                            dependantsData: prev.dependantsData.filter(
                              (d) => d.id !== currentDependant.id,
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
                          selectedKeys={
                            currentDependant.relationship
                              ? [currentDependant.relationship]
                              : []
                          }
                          onSelectionChange={(keys) => {
                            const selected = Array.from(keys)[0] as string;

                            handleChangeDep({
                              name: "relationship",
                              value: selected,
                            });
                          }}
                        >
                          {[
                            "Spouse",
                            "Parent",
                            "Child",
                            "Sibling",
                            "Next Of Kin",
                          ].map((r) => (
                            <SelectItem key={r}>{r}</SelectItem>
                          ))}
                        </Select>

                        <Select
                          label="Title"
                          selectedKeys={
                            currentDependant.title
                              ? [currentDependant.title]
                              : []
                          }
                          onSelectionChange={(keys) =>
                            handleChangeDep({
                              name: "title",
                              value: Array.from(keys)[0] as string,
                            })
                          }
                        >
                          {[
                            "Mr",
                            "Mrs",
                            "Miss",
                            "Dr",
                            "Prof",
                            "Ms",
                            "Master",
                          ].map((t) => (
                            <SelectItem key={t}>{t}</SelectItem>
                          ))}
                        </Select>

                        <Input
                          errorMessage={errors.firstName}
                          label="First Name"
                          name="firstName"
                          value={currentDependant.firstName}
                          onChange={handleChangeDep}
                        />

                        <Input
                          errorMessage={errors.middleName}
                          label="Middle Name"
                          name="middleName"
                          value={currentDependant.middleName}
                          onChange={handleChangeDep}
                        />

                        <Input
                          errorMessage={errors.surname}
                          label="Surname"
                          name="surname"
                          value={currentDependant.surname}
                          onChange={handleChangeDep}
                        />

                        <Select
                          label="ID Type"
                          selectedKeys={
                            currentDependant.idtypes
                              ? [currentDependant.idtypes]
                              : []
                          }
                          onSelectionChange={(keys) =>
                            handleChangeDep({
                              name: "idtypes",
                              value: Array.from(keys)[0] as string,
                            })
                          }
                        >
                          {["National ID", "Passport", "Birth Certificate"].map(
                            (t) => (
                              <SelectItem key={t}>{t}</SelectItem>
                            ),
                          )}
                        </Select>

                        <Input
                          errorMessage={errors.idnos}
                          label="ID Number"
                          name="idnos"
                          value={currentDependant.idnos}
                          onChange={handleChangeDep}
                        />

                        <Input
                          errorMessage={errors.dob}
                          label="DOB"
                          max={today}
                          name="dob"
                          type="date"
                          value={currentDependant.dob}
                          onChange={handleChangeDep}
                        />

                        <Select
                          label="Gender"
                          selectedKeys={
                            currentDependant.gendere
                              ? [currentDependant.gendere]
                              : []
                          }
                          onSelectionChange={(keys) =>
                            handleChangeDep({
                              name: "gendere",
                              value: Array.from(keys)[0] as string,
                            })
                          }
                        >
                          {["Male", "Female"].map((g) => (
                            <SelectItem key={g}>{g}</SelectItem>
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
