declare global {
  type User = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: string;
    branchName: string;
    isActive: boolean;
    createdAt: string;
    lastLogin: string | null;
    password: string; // Include password for adding new users
  };
  type Branch = {
    id: number;
    name: string;
    address: string;
    contact: string;
    areaId: number | null;
  };

  type Area = {
    id: number;
    name: string;
    branches: { name: string }[];
  };

  type Reason = {
    id: number;
    nameEN: string;
    nameAR: string;
    descriptionEN: string;
    descriptionAR: string;
  };

  type Source = {
    id: number;
    nameEN: string;
    nameAR: string;
    descriptionEN: string;
    descriptionAR: string;
  };

  type DefinitionsData = {
    branches: Branch[];
    areas: Area[];
    reasons: Reason[];
    sources: Source[];
  };

  type Action = {
    name: string;
    icon: React.ReactNode;
    tip: string;
    onClick?: (row: { [key: string]: string | number }) => void; // Optional to avoid errors
  };
}

export type MainHeaderProps = {
  logoUrl: string | StaticImageData;
  isRtl: boolean;
};

// types.d.ts

export interface FormInputIconProps {
  name: string; // The name of the input field, used for Formik integration
  label: string; // The label text displayed above the input
  type?: string; // Input type, default is "text"
  startIcon?: React.ReactNode; // Optional start icon component
  children?: React.ReactNode; // Optional end icon component
  onClick?: () => void; // Click event handler for the end icon button
  onMouseDown?: () => void; // Mouse down event handler for the end icon button
  helpertext?: string; // Optional helper text displayed below the input
}

// types.d.ts
export type MainHeaderProps = {
  logoUrl: StaticImageData; // Adjusted from string to StaticImageData
  isRtl: boolean;
};

export {};
