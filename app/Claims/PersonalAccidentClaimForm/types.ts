export interface FormdataType {
    insuredName: string;
    phone: string;
    address: string;
    occupation: string;
    age: string | number;
    accidentDate: string;
    accidentTime: string;
    accidentPlace: string;
    accidentDescription: string;
    injuries: string;
    previousInjury: string;
    confinedBed: string;
    confinedHouse: string;
    doctorDetails: string;
    pastTreatment: string;
    witnesses: string;
    otherInsurance: string;
    declarationDate: string;
    declarationName: string;
    declarationSignature: string;
    patientName: string;
    // Medical Section
    doctorName: string;
    doctorRegNo: string;
    hospital: string;
    examDate: string;
    medicalInjuries: string;
    disability: string;
    incapacityPeriod: string;
    disabilityAssessment: string;
    previousDefects: string;
    doctorSignature: string;
    doctorSignatureDate: string;
    qualifications: string;
    doctorPhone: string;
    medicalDate: string;
    doctorSignatureFile?: File;
}

