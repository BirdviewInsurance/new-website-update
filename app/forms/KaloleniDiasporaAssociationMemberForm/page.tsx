"use client";

import React, { useState, useEffect } from "react";
import {
  Input,
  Button,
  Card,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  toast,
  Select,
  SelectItem,
} from "@heroui/react";
import PhoneInput from "react-phone-input-2";
import { motion, AnimatePresence } from "framer-motion";
import "react-phone-input-2/lib/style.css";

export interface DependantType {
  id: number;
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
  dependantsData: DependantType[];
}

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
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo (Congo-Brazzaville)",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czechia (Czech Republic)",
  "Democratic Republic of the Congo",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini (fmr. Swaziland)",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar (Burma)",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Korea",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Korea",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];
const titles = ["Mr", "Master", "Mrs", "Miss", "Ms", "Dr", "Prof"];
const idTypes = ["National ID", "Passport", "Birth Certificate"];
const genders = ["Male", "Female", "Others"];
const relationships = ["Spouse", "Parent", "Child", "Sibling", "Next Of Kin"];

const MemberForm: React.FC = () => {
  const today = new Date().toISOString().split("T")[0];
  const [formData, setFormData] = useState<FormdataType>({
    memberidno: "",
    groupname: "Kaloleni Diaspora Association",
    groupnumber: "KADA",
    title: "",
    firstname: "",
    lastname: "",
    middlename: "",
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
        countrye: "Kenya",
        cities: "",
      },
    ],
  });

  const [dependentCount, setDependentCount] = useState(1);
  const [currentDependant, setCurrentDependant] =
    useState<DependantType | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [loaderIcon, setLoaderIcon] = useState<boolean>(false);
  const [toasterOpen, setToasterOpen] = useState(false);
  const [toastMessage, settoastMessage] = useState<string>("");
  const [toastType, settoastType] = useState<
    "success" | "error" | "info" | "warning"
  >("info");

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
            countrye: "Kenya",
            cities: "",
          }
        );
      });

      return { ...prev, dependantsData: newDependants };
    });
  }, [dependentCount]);

  useEffect(() => {
    const now = new Date();
    const uniqueNumber = `${now.getFullYear()}${now.getMonth() + 1}${now.getDate()}${now.getHours()}${now.getMinutes()}${now.getSeconds()}${now.getMilliseconds()}`;

    setFormData((prev) => ({
      ...prev,
      memberidno: `Birdview-M${uniqueNumber.slice(-6)}`,
    }));
  }, []);

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
    if (dependentCount >= 7) {
      (toast as any).error("Maximum 7 dependants allowed.");

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
    } else {
      const { name, value } = e;

      setCurrentDependant((prev) => prev && { ...prev, [name]: value });
    }
  };

  const handleSaveDependant = () => {
    if (!currentDependant) return;
    setFormData((prev) => ({
      ...prev,
      dependantsData: prev.dependantsData.map((d) =>
        d.id === currentDependant.id ? currentDependant : d,
      ),
    }));
    handleCloseModal();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    setLoaderIcon(true);

    // Ensure dependantsData is up-to-date
    const updatedFormData = {
      ...formData,
      dependantsData: formData.dependantsData,
    };

    try {
      const res = await fetch(
        "/api/kaloleni-diaspora-association-member-form",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedFormData),
        },
      );

      const data = await res.json();

      if (res.ok) {
        // Show success snackbar
        settoastType("success");
        settoastMessage(data.message);
        console.log(data);
        setToasterOpen(true);
        setLoaderIcon(false);

        // Reset the form data after a successful submission
        handleReset(); // Reset the form here
      } else {
        // Show error snackbar
        settoastType("error");
        settoastMessage(`Error: ${data.error}`);
        setToasterOpen(true);
        setLoaderIcon(false);
      }
    } catch (error) {
      // Show error snackbar
      settoastType("error");
      settoastMessage(
        `Error: ${
          error instanceof Error
            ? error.message
            : "An unexpected error occurred"
        }`,
      );
      setToasterOpen(true);
      setLoaderIcon(false);
    }
  };

  // Add this inside your MemberForm component
  const handleReset = () => {
    setFormData({
      memberidno: "",
      groupname: "Kaloleni Diaspora Association",
      groupnumber: "KADA",
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
          countrye: "",
          cities: "",
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
      <Card className="w-full max-w-4xl shadow-xl rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Kaloleni Diaspora Member Detail Form
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Member Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input disabled label="Member ID" value={formData.memberidno} />
            <Input disabled label="Group Name" value={formData.groupname} />
            <Input disabled label="Group Number" value={formData.groupnumber} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select
              label="Title"
              selectedKeys={formData.title ? [formData.title] : []}
              onSelectionChange={(keys) => {
                const selected = Array.from(keys)[0] as string;

                handleChange({
                  target: { name: "title", value: selected },
                } as any);
              }}
            >
              {titles.map((t) => (
                <SelectItem key={t}>{t}</SelectItem>
              ))}
            </Select>
            <Input
              label="First Name"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
            />
            <Input
              label="Last Name"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Middle Name"
              name="middlename"
              value={formData.middlename}
              onChange={handleChange}
            />
            <Select
              label="ID Type"
              selectedKeys={formData.idtype ? [formData.idtype] : []}
              onSelectionChange={(keys) => {
                const selected = Array.from(keys)[0] as string;

                handleChange({
                  target: { name: "idtype", value: selected },
                } as any);
              }}
            >
              {idTypes.map((id) => (
                <SelectItem key={id}>{id}</SelectItem>
              ))}
            </Select>
            <Input
              label="ID Number"
              name="idno"
              value={formData.idno}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Date of Birth"
              max={today}
              name="dateofbirth"
              type="date"
              value={formData.dateofbirth}
              onChange={handleChange}
            />
            <Select
              label="Gender"
              selectedKeys={formData.gender ? [formData.gender] : []}
              onSelectionChange={(keys) =>
                handleChange({
                  target: { name: "gender", value: Array.from(keys)[0] },
                } as any)
              }
            >
              {genders.map((g) => (
                <SelectItem key={g}>{g}</SelectItem>
              ))}
            </Select>
            <Select
              label="Country"
              selectedKeys={[formData.country]}
              onSelectionChange={(keys) =>
                handleChange({
                  target: { name: "country", value: Array.from(keys)[0] },
                } as any)
              }
            >
              {countries.map((c) => (
                <SelectItem key={c}>{c}</SelectItem>
              ))}
            </Select>
          </div>

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
              inputStyle={{
                width: "100%",
                height: "57px",
                borderRadius: "8px",
              }}
              value={formData.mobileno}
              onChange={handlePhoneChange}
            />
          </div>

          <Input
            label="Email"
            name="eimail"
            value={formData.eimail}
            onChange={handleChange}
          />

          {/* Dependants */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold">Dependants</h3>
              <Button onClick={handleAddDependant}>Add Dependant</Button>
            </div>
            {formData.dependantsData.map((dep) => (
              <Button
                key={dep.id}
                className="my-2"
                type="button"
                onClick={() => handleOpenModal(dep)}
              >
                Edit Dependant {dep.id}
              </Button>
            ))}
          </div>

          <div className="flex justify-center gap-6 mt-6">
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

      <AnimatePresence>
        {openModal && currentDependant && (
          <motion.div
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
          >
            <motion.div
              animate={{ y: 0, opacity: 1 }}
              className="w-full max-w-lg"
              exit={{ y: 100, opacity: 0 }}
              initial={{ y: 100, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Modal isOpen={openModal} size="lg" onOpenChange={setOpenModal}>
                <ModalContent>
                  <ModalHeader>Edit Dependant</ModalHeader>
                  <ModalBody className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                      {relationships.map((r) => (
                        <SelectItem key={r}>{r}</SelectItem>
                      ))}
                    </Select>
                    <Select
                      label="Title"
                      selectedKeys={
                        currentDependant.title ? [currentDependant.title] : []
                      }
                      onSelectionChange={(keys) => {
                        const selected = Array.from(keys)[0] as string;

                        handleChangeDep({ name: "title", value: selected });
                      }}
                    >
                      {titles.map((t) => (
                        <SelectItem key={t}>{t}</SelectItem>
                      ))}
                    </Select>
                    <Input
                      label="First Name"
                      value={currentDependant.firstName}
                      onChange={(e) => handleChangeDep(e)}
                    />
                    <Input
                      label="Middle Name"
                      value={currentDependant.middleName}
                      onChange={(e) => handleChangeDep(e)}
                    />
                    <Input
                      label="Surname"
                      value={currentDependant.surname}
                      onChange={(e) => handleChangeDep(e)}
                    />
                    <Select
                      label="ID Type"
                      selectedKeys={
                        currentDependant.idtypes
                          ? [currentDependant.idtypes]
                          : []
                      }
                      onSelectionChange={(keys) => {
                        const selected = Array.from(keys)[0] as string;

                        handleChangeDep({ name: "idtypes", value: selected });
                      }}
                    >
                      {idTypes.map((id) => (
                        <SelectItem key={id}>{id}</SelectItem>
                      ))}
                    </Select>
                    <Input
                      label="ID No"
                      value={currentDependant.idnos}
                      onChange={(e) => handleChangeDep(e)}
                    />
                    <Input
                      label="DOB"
                      max={today}
                      type="date"
                      value={currentDependant.dob}
                      onChange={(e) => handleChangeDep(e)}
                    />
                    <Select
                      label="Gender"
                      selectedKeys={
                        currentDependant.gendere
                          ? [currentDependant.gendere]
                          : []
                      }
                      onSelectionChange={(keys) => {
                        const selected = Array.from(keys)[0] as string;

                        handleChangeDep({ name: "gendere", value: selected });
                      }}
                    >
                      {["Male", "Female"].map((g) => (
                        <SelectItem key={g}>{g}</SelectItem>
                      ))}
                    </Select>
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

export default MemberForm;
