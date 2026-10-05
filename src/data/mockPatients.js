export const patients = [
  {
    id: 'P-1042',
    name: 'Zain-ul-Abidin',
    role: 'Returning Patient',
    consentGiven: true,
    profileCreatedAt: '2025-11-02',
    signingSpeedBaseline: 1.8,
    exemplars: 24,
    personalized: true,
    visits: ['V-201', 'V-187', 'V-133'],
  },
  { id: 'P-1043', name: 'Ahmed Raza', role: 'New Patient', consentGiven: false, profileCreatedAt: null, signingSpeedBaseline: null, exemplars: 0, personalized: false, visits: [] },
]

export const mockPatientLookup = { 'P-1042': patients[0], '1042': patients[0] }
