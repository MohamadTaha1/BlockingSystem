const definitionsData = {
  branches: [
    { id: 1, name: "Head Office", address: "123 Main Street", contact: "123-456-7890", areaId: 1 },
    { id: 2, name: "Branch A", address: "456 Elm Street", contact: "098-765-4321", areaId: 1 },
    { id: 3, name: "Branch B", address: "789 Pine Road", contact: "456-123-7890", areaId: 2 },
    { id: 4, name: "Branch C", address: "321 Oak Avenue", contact: "789-456-1230", areaId: 2 },
    { id: 5, name: "Branch D", address: "555 Maple Lane", contact: "111-222-3333", areaId: 3 },
    { id: 6, name: "Branch E", address: "999 Birch Blvd", contact: "444-555-6666", areaId: 3 },
    { id: 7, name: "Branch F", address: "888 Cedar Way", contact: "777-888-9999", areaId: 4 },
    { id: 8, name: "Branch G", address: "222 Walnut Court", contact: "000-111-2222", areaId: 4 },
    { id: 9, name: "Branch H", address: "444 Spruce Street", contact: "333-444-5555", areaId: 5 },
    { id: 10, name: "Branch I", address: "666 Aspen Drive", contact: "666-777-8888", areaId: 5 },
  ],
  areas: [
    { id: 1, name: "Area 1", branches: [{ name: "Head Office" }, { name: "Branch A" }] },
    { id: 2, name: "Area 2", branches: [{ name: "Branch B" }, { name: "Branch C" }] },
    { id: 3, name: "Area 3", branches: [{ name: "Branch D" }, { name: "Branch E" }] },
    { id: 4, name: "Area 4", branches: [{ name: "Branch F" }, { name: "Branch G" }] },
    { id: 5, name: "Area 5", branches: [{ name: "Branch H" }, { name: "Branch I" }] },
  ],
  reasons: [
    {
      id: 1,
      nameEN: "Fraud",
      nameAR: "احتيال",
      descriptionEN: "Suspicious activity detected.",
      descriptionAR: "تم اكتشاف نشاط مشبوه.",
    },
    {
      id: 2,
      nameEN: "Compliance",
      nameAR: "التوافق",
      descriptionEN: "Policy violation detected.",
      descriptionAR: "تم اكتشاف انتهاك للسياسات.",
    },
  ],
  sources: [
    {
      id: 1,
      nameEN: "Internal Audit",
      nameAR: "التدقيق الداخلي",
      descriptionEN: "Review conducted by internal team.",
      descriptionAR: "مراجعة أجراها فريق داخلي.",
    },
    {
      id: 2,
      nameEN: "External Compliance",
      nameAR: "التوافق الخارجي",
      descriptionEN: "Review conducted by an external entity.",
      descriptionAR: "مراجعة أجرتها جهة خارجية.",
    },
  ],
};

export default definitionsData;
