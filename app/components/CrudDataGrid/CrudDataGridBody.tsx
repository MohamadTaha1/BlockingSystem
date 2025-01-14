import React from "react";
import ActionButtons from "./ActionButtons";
import { useTranslations } from "next-intl";

type CrudDataGridBodyProps = {
  columns: { key: string; label: string }[];
  data: { [key: string]: string | number }[];
  showActions?: boolean;
  actions?: {
    name: string;
    icon: React.ReactNode;
    tip: string;
    onClick?: (row: { [key: string]: string | number }) => void; // Row-specific action handler
  }[];
  onActionClick?: (rowIndex: number, action: string) => void; // Add this property
  onRowDoubleClick?: (row: { [key: string]: string | number }) => void; // Add this line
  isModal?: boolean;
  modalComponent?: React.ReactNode;
  onModalOpen?: (
    rowIndex: number,
    row: { [key: string]: string | number }
  ) => void;
  isComponent?: boolean;
  componentToRender?: React.ReactNode;
  onComponentRender?: (
    rowIndex: number,
    row: { [key: string]: string | number }
  ) => void;
};


const CrudDataGridBody: React.FC<CrudDataGridBodyProps> = ({
  columns,
  data,
  showActions = false,
  actions = [],
  isModal,
  modalComponent,
  onRowDoubleClick,

}) => {
  const t = useTranslations("crudDataGrid");
 

  return (
    <div>
      <div className="flex bg-info-light border-b border-gray-300">
        {columns.map((col, index) => (
          <div
            key={index}
            className="flex-1 px-4 py-2 font-semibold text-gray-700 cursor-default"
          >
            {col.label}
          </div>
        ))}
        {showActions && (
          <div className="w-32 px-4 py-2 font-semibold text-gray-700">
            actions
          </div>
        )}
      </div>

      <div>
        {data.length > 0 ? (
          data.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="flex border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
              onDoubleClick={() => onRowDoubleClick && onRowDoubleClick(row)} // Double-click handler
            >
              {columns.map((col, colIndex) => (
                <div key={colIndex} className="flex-1 px-4 py-2 text-gray-600">
                  {row[col.key] || ""}
                </div>
              ))}
              {showActions && (
                <div className="w-32 px-4 py-2 flex items-center">
                  <ActionButtons
                    actions={actions.map((action) => ({
                      ...action,
                      onClick: action.onClick
                        ? () => action.onClick!(row)
                        : undefined,
                    }))}
                  />
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center py-4 text-gray-500">
            {t("noItems")}
          </div>
        )}
      </div>
      {isModal && modalComponent}
    </div>
  );
};

export default CrudDataGridBody;
