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

export interface BeneficiaryType {
  id: number;
  relationship: string;
  title: string;
  beneficiary_fullname: string;
  dob: string;
  phone_number: string;
  beneficiary_address: string;
  beneficiary_email: string;
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
  beneficiariesData: BeneficiaryType[];
}

// Constants
const countries = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria",
  "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan",
  "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde",
  "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo (Congo-Brazzaville)",
  "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czechia (Czech Republic)", "Democratic Republic of the Congo", "Denmark", "Djibouti", "Dominica", "Dominican Republic",
  "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini (fmr. Swaziland)", "Ethiopia", "Fiji", "Finland",
  "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea",
  "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq",
  "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait",
  "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg",
  "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico",
  "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar (Burma)", "Namibia", "Nauru",
  "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman",
  "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar",
  "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia",
  "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa",
  "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan",
  "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan",
  "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City",
  "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"]; // simplified for brevity
const titles = ["Mr", "Master", "Mrs", "Miss", "Ms", "Dr", "Prof"];
const idTypes = ["National ID", "Passport", "Birth Certificate"];
const genders = ["Male", "Female", "Others"];
const relationships = ["Spouse", "Parent", "Child", "Sibling", "Next Of Kin"];

const QuunganaMemberForm: React.FC = () => {
  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState<FormdataType>({
    memberidno: "",
    groupname: "North Wales Kenya Community",
    groupnumber: "NWKC",
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
    beneficiariesData: [
      {
        id: 1,
        relationship: "",
        title: "",
        beneficiary_fullname: "",
        dob: "",
        phone_number: "",
        beneficiary_address: "",
        beneficiary_email: "",
      },
    ],
  });

  const [dependentCount, setDependentCount] = useState(1);
  const [beneficiaryCount, setBeneficiaryCount] = useState(1);

  const [currentDependant, setCurrentDependant] = useState<DependantType | null>(null);
  const [currentBeneficiary, setCurrentBeneficiary] = useState<BeneficiaryType | null>(null);

  const [openDepModal, setOpenDepModal] = useState(false);
  const [openBenModal, setOpenBenModal] = useState(false);

  // Auto-generate Member ID
  useEffect(() => {
    const now = new Date();
    const uniqueNumber = `${now.getFullYear()}${now.getMonth() + 1}${now.getDate()}${now.getHours()}${now.getMinutes()}${now.getSeconds()}${now.getMilliseconds()}`;
    setFormData((prev) => ({ ...prev, memberidno: `Birdview-M${uniqueNumber.slice(-6)}` }));
  }, []);

  // Sync dependants count
  useEffect(() => {
    setFormData((prev) => {
      const newDeps = Array.from({ length: dependentCount }, (_, idx) => prev.dependantsData[idx] || {
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
      });
      return { ...prev, dependantsData: newDeps };
    });
  }, [dependentCount]);

  // Sync beneficiaries count
  useEffect(() => {
    setFormData((prev) => {
      const newBens = Array.from({ length: beneficiaryCount }, (_, idx) => prev.beneficiariesData[idx] || {
        id: idx + 1,
        relationship: "",
        title: "",
        beneficiary_fullname: "",
        dob: "",
        phone_number: "",
        beneficiary_address: "",
        beneficiary_email: "",
      });
      return { ...prev, beneficiariesData: newBens };
    });
  }, [beneficiaryCount]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (value: string) => {
    setFormData((prev) => ({ ...prev, mobileno: value }));
  };

  const handleAddDependant = () => setDependentCount(prev => prev + 1);
  const handleAddBeneficiary = () => setBeneficiaryCount(prev => prev + 1);

  // Open / Close Modals
  const handleOpenDepModal = (dep: DependantType) => { setCurrentDependant(dep); setOpenDepModal(true); };
  const handleCloseDepModal = () => { setCurrentDependant(null); setOpenDepModal(false); };

  const handleOpenBenModal = (ben: BeneficiaryType) => { setCurrentBeneficiary(ben); setOpenBenModal(true); };
  const handleCloseBenModal = () => { setCurrentBeneficiary(null); setOpenBenModal(false); };

  // Change handlers for modals
  const handleChangeDep = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | { name: string; value: string }) => {
    if ("target" in e) {
      const { name, value } = e.target;
      setCurrentDependant(prev => prev && { ...prev, [name]: value });
    } else {
      const { name, value } = e;
      setCurrentDependant(prev => prev && { ...prev, [name]: value });
    }
  };

  const handleChangeBen = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | { name: string; value: string }) => {
    if ("target" in e) {
      const { name, value } = e.target;
      setCurrentBeneficiary(prev => prev && { ...prev, [name]: value });
    } else {
      const { name, value } = e;
      setCurrentBeneficiary(prev => prev && { ...prev, [name]: value });
    }
  };

  // Save modal changes
  const handleSaveDependant = () => {
    if (!currentDependant) return;
    setFormData(prev => ({
      ...prev,
      dependantsData: prev.dependantsData.map(d => d.id === currentDependant.id ? currentDependant : d),
    }));
    handleCloseDepModal();
  };

  const handleSaveBeneficiary = () => {
    if (!currentBeneficiary) return;
    setFormData(prev => ({
      ...prev,
      beneficiariesData: prev.beneficiariesData.map(b => b.id === currentBeneficiary.id ? currentBeneficiary : b),
    }));
    handleCloseBenModal();
  };

  const handleReset = () => {
    setFormData(prev => ({
      ...prev,
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
      dependantsData: [{ id: 1, relationship: "", title: "", firstName: "", middleName: "", surname: "", idtypes: "", idnos: "", dob: "", gendere: "", countrye: "Kenya", cities: "" }],
      beneficiariesData: [{ id: 1, relationship: "", title: "", beneficiary_fullname: "", dob: "", phone_number: "", beneficiary_address: "", beneficiary_email: "" }],
    }));
    setDependentCount(1);
    setBeneficiaryCount(1);
  };

  // Form submit (dummy)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    (toast as any).success("Form submitted. Check console for output");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <Card className="w-full max-w-5xl shadow-xl rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Quungana Member Form</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Member Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input label="Member ID" value={formData.memberidno} disabled />
            <Input label="Group Name" value={formData.groupname} disabled />
            <Input label="Group Number" value={formData.groupnumber} disabled />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select 
              label="Title" 
              selectedKeys={formData.title ? [formData.title] : []} 
              onSelectionChange={(keys) => {
                const selected = Array.from(keys)[0] as string;
                handleChange({ target: { name: "title", value: selected } } as any);
              }}
            >
              {titles.map(t => <SelectItem key={t}>{t}</SelectItem>)}
            </Select>
            <Input label="First Name" name="firstname" value={formData.firstname} onChange={handleChange} />
            <Input label="Last Name" name="lastname" value={formData.lastname} onChange={handleChange} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input label="Middle Name" name="middlename" value={formData.middlename} onChange={handleChange} />
            <Select 
              label="ID Type" 
              selectedKeys={formData.idtype ? [formData.idtype] : []} 
              onSelectionChange={(keys) => {
                const selected = Array.from(keys)[0] as string;
                handleChange({ target: { name: "idtype", value: selected } } as any);
              }}
            >
              {idTypes.map(id => <SelectItem key={id}>{id}</SelectItem>)}
            </Select>
            <Input label="ID Number" name="idno" value={formData.idno} onChange={handleChange} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input label="Date of Birth" type="date" max={today} name="dateofbirth" value={formData.dateofbirth} onChange={handleChange} />
            <Select 
              label="Gender" 
              selectedKeys={formData.gender ? [formData.gender] : []} 
              onSelectionChange={(keys) => {
                const selected = Array.from(keys)[0] as string;
                handleChange({ target: { name: "gender", value: selected } } as any);
              }}
            >
              {genders.map(g => <SelectItem key={g}>{g}</SelectItem>)}
            </Select>
            <Select 
              label="Country" 
              selectedKeys={formData.country ? [formData.country] : []} 
              onSelectionChange={(keys) => {
                const selected = Array.from(keys)[0] as string;
                handleChange({ target: { name: "country", value: selected } } as any);
              }}
            >
              {countries.map(c => <SelectItem key={c}>{c}</SelectItem>)}
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input label="City" name="city" value={formData.city} onChange={handleChange} />
            <Input label="Address" name="address" value={formData.address} onChange={handleChange} />
            <PhoneInput country="ke" value={formData.mobileno} onChange={handlePhoneChange} inputStyle={{ width: "100%", height: "57px", borderRadius: "8px" }} />
          </div>

          <Input label="Email" name="eimail" value={formData.eimail} onChange={handleChange} />

          {/* Dependants */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold">Dependants</h3>
              <Button onClick={handleAddDependant}>Add Dependant</Button>
            </div>
            {formData.dependantsData.map(dep => (
              <Button key={dep.id} type="button" className="my-2" onClick={() => handleOpenDepModal(dep)}>Edit Dependant {dep.id}</Button>
            ))}
          </div>

          {/* Beneficiaries */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold">Beneficiaries</h3>
              <Button onClick={handleAddBeneficiary}>Add Beneficiary</Button>
            </div>
            {formData.beneficiariesData.map(ben => (
              <Button key={ben.id} type="button" className="my-2" onClick={() => handleOpenBenModal(ben)}>Edit Beneficiary {ben.id}</Button>
            ))}
          </div>

          <div className="flex justify-center gap-6 mt-6">
            <motion.button
              type="button"
              onClick={handleReset}
              whileHover={{ y: -3, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold text-lg px-8 py-3 rounded-xl shadow-lg transition-all duration-300"
            >
              Reset
            </motion.button>

            <motion.button
              type="submit"
              whileHover={{ y: -3, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg px-8 py-3 rounded-xl shadow-xl transition-all duration-300"
            >
              Submit
            </motion.button>

          </div>
        </form>
      </Card>

      {/* Dependant Modal */}
      <Modal isOpen={openDepModal} onOpenChange={setOpenDepModal} size="lg">
        <ModalContent>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="w-full rounded-2xl shadow-2xl bg-white overflow-hidden"
          >
            <ModalHeader className="text-xl font-semibold text-gray-800 border-b border-gray-200 px-6 py-4">
              Edit Dependant
            </ModalHeader>

            <ModalBody className="grid grid-cols-1 md:grid-cols-3 gap-4 px-6 py-4">
              <Select
                label="Relationship"
                selectedKeys={currentDependant?.relationship ? [currentDependant.relationship] : []}
                onSelectionChange={(keys) => {
                  const selected = Array.from(keys)[0] as string;
                  handleChangeDep({ name: "relationship", value: selected });
                }}
              >
                {relationships.map((r) => (
                  <SelectItem key={r}>{r}</SelectItem>
                ))}
              </Select>

              <Select
                label="Title"
                selectedKeys={currentDependant?.title ? [currentDependant.title] : []}
                onSelectionChange={(keys) => {
                  const selected = Array.from(keys)[0] as string;
                  handleChangeDep({ name: "title", value: selected });
                }}
              >
                {titles.map((t) => <SelectItem key={t}>{t}</SelectItem>)}
              </Select>

              <Input
                label="First Name"
                value={currentDependant?.firstName || ""}
                onChange={(e) => handleChangeDep(e)}
              />

              <Input
                label="Middle Name"
                value={currentDependant?.middleName || ""}
                onChange={(e) => handleChangeDep(e)}
              />

              <Input
                label="Surname"
                value={currentDependant?.surname || ""}
                onChange={(e) => handleChangeDep(e)}
              />

              <Select
                label="ID Type"
                selectedKeys={currentDependant?.idtypes ? [currentDependant.idtypes] : []}
                onSelectionChange={(keys) => {
                  const selected = Array.from(keys)[0] as string;
                  handleChangeDep({ name: "idtypes", value: selected });
                }}
              >
                {idTypes.map((id) => <SelectItem key={id}>{id}</SelectItem>)}
              </Select>

              <Input
                label="ID Number"
                value={currentDependant?.idnos || ""}
                onChange={(e) => handleChangeDep(e)}
              />

              <Input
                label="Date of Birth"
                type="date"
                max={today}
                value={currentDependant?.dob || ""}
                onChange={(e) => handleChangeDep(e)}
              />

              <Select
                label="Gender"
                selectedKeys={currentDependant?.gendere ? [currentDependant.gendere] : []}
                onSelectionChange={(keys) => {
                  const selected = Array.from(keys)[0] as string;
                  handleChangeDep({ name: "gendere", value: selected });
                }}
              >
                {genders.map((g) => <SelectItem key={g}>{g}</SelectItem>)}
              </Select>

              <Select
                label="Country"
                selectedKeys={currentDependant?.countrye ? [currentDependant.countrye] : ["Kenya"]}
                onSelectionChange={(keys) => {
                  const selected = Array.from(keys)[0] as string;
                  handleChangeDep({ name: "countrye", value: selected });
                }}
              >
                {countries.map((c) => <SelectItem key={c}>{c}</SelectItem>)}
              </Select>

              <Input
                label="City"
                value={currentDependant?.cities || ""}
                onChange={(e) => handleChangeDep(e)}
              />
            </ModalBody>

            <ModalFooter className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200">
              <Button variant="light" onPress={handleCloseDepModal}>Cancel</Button>
              <Button color="primary" onPress={handleSaveDependant}>Save</Button>
            </ModalFooter>
          </motion.div>
        </ModalContent>
      </Modal>

      {/* Beneficiary Modal */}
      <Modal isOpen={openBenModal} onOpenChange={setOpenBenModal} size="lg">
        <ModalContent>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="w-full rounded-2xl shadow-2xl bg-white overflow-hidden"
          >
            <ModalHeader className="text-xl font-semibold text-gray-800 border-b border-gray-200 px-6 py-4">
              Edit Beneficiary
            </ModalHeader>

            <ModalBody className="grid grid-cols-1 md:grid-cols-3 gap-4 px-6 py-4">
              <Select
                label="Relationship"
                selectedKeys={currentBeneficiary?.relationship ? [currentBeneficiary.relationship] : []}
                onSelectionChange={(keys) => {
                  const selected = Array.from(keys)[0] as string;
                  handleChangeBen({ name: "relationship", value: selected });
                }}
              >
                {relationships.map((r) => <SelectItem key={r}>{r}</SelectItem>)}
              </Select>

              <Select
                label="Title"
                selectedKeys={currentBeneficiary?.title ? [currentBeneficiary.title] : []}
                onSelectionChange={(keys) => {
                  const selected = Array.from(keys)[0] as string;
                  handleChangeBen({ name: "title", value: selected });
                }}
              >
                {titles.map((t) => <SelectItem key={t}>{t}</SelectItem>)}
              </Select>

              <Input
                label="Full Name"
                value={currentBeneficiary?.beneficiary_fullname || ""}
                onChange={(e) => handleChangeBen(e)}
              />

              <Input
                label="Date of Birth"
                type="date"
                max={today}
                value={currentBeneficiary?.dob || ""}
                onChange={(e) => handleChangeBen(e)}
              />

              <Input
                label="Phone Number"
                value={currentBeneficiary?.phone_number || ""}
                onChange={(e) => handleChangeBen(e)}
              />

              <Input
                label="Address"
                value={currentBeneficiary?.beneficiary_address || ""}
                onChange={(e) => handleChangeBen(e)}
              />

              <Input
                label="Email"
                value={currentBeneficiary?.beneficiary_email || ""}
                onChange={(e) => handleChangeBen(e)}
              />
            </ModalBody>

            <ModalFooter className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200">
              <Button variant="light" onPress={handleCloseBenModal}>Cancel</Button>
              <Button color="primary" onPress={handleSaveBeneficiary}>Save</Button>
            </ModalFooter>
          </motion.div>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default QuunganaMemberForm;
