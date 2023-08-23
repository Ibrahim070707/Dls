 const SideNav = [
    {
      Tile: "Dashboard",
      IsDropDown: 2,
      id: "Dashboard",
      Links: "",
      To: "/",
      icon: <FaTv className="text-lg" />,
    },
    {
      Tile: "My Task",
      id: "DataBank",
      IsDropDown: 1,
      icon: <FaDatabase className="text-lg" />,
      Links: [
        {
          Title: "Data Allocation",
          To: "/Allocation",
          id: "Allocation",
        },
        {
          Title: "ReAllocation",
          To: "/ReAllocation",
          id: "ReAllocation",
        },
        {
          Title: "Movements",
          To: "/Movements",
          id: "Movements",
        },
      ],
    },
    {
      Tile: "Employee Corner",
      IsDropDown: 1,
      icon: <FaUsers className="text-lg" />,
      id: "EmployeeCreation",
      Links: [
        {
          Title: "EMP ID Creation",
          To: "/CreateEmployee",
          id: "ListBranch",
        },
        {
          Title: "ALL ID'S",
          To: "/AllIds",
          id: "AllIds",
        },
        {
          Title: "Payrolls",
          To: "/Payrolls",
          id: "Payrolls",
        },
      ],
    },
    // UserData.user_type == 1 ?
    {
      Tile: "Reports",
      icon: <FaTasks className="text-lg" />,
      IsDropDown: 1,
      id: "Reports",
      Links: [
        {
          Title: "Business Reports",
          To: "add",
        },
        {
          Title: "CSR Reports",
          To: "/CsrReports",
          id: "CsrReports"
        },
        {
          Title: "Recovery Reports",
          To: "add",
        },
      ],
    },
    // : ""
    {
      // UserData.user_type == 1 ?
      Tile: "Financials",
      icon: <FaWallet className="text-lg" />,
      IsDropDown: 1,
      Links: [
        {
          Title: "Statement",
          To: "add",
        },
        {
          Title: "Invoice",
          To: "add",
        },
      ],
    },
    // : ""
  ];