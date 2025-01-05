import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import { guessColumnTypes } from "./guessColumnTypes";
import { atom, useAtom } from "jotai";

type ColumnConfigProps = {
  data: any[];
  meta: any;
};

export type ColumnConfig = {
  name: string;
  type: "string" | "number" | "date" | "boolean";
};

const EqualSpace = styled.div`
  margin: 0 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const ColumnConfigAtom = atom<ColumnConfig[]>([]);

export const ColumnConfig = ({ data, meta }: ColumnConfigProps) => {
  const [columns, setColumns] = useAtom(ColumnConfigAtom);

  // Use effect to guess column types when component mounts
  useEffect(() => {
    const guessedTypes = guessColumnTypes(data, meta.fields);
    setColumns(guessedTypes);
  }, [data, meta.fields]);

  const handleTypeChange = (index: number, type: ColumnConfig["type"]) => {
    const newColumns = [...columns];
    newColumns[index].type = type;
    setColumns(newColumns);
  };

  return (
    <div>
      <h2>Column Config</h2>
      {meta.fields.map((field: string, index: number) => (
        <EqualSpace key={field}>
          <label>{field}</label>
          <select
            value={columns[index]?.type || "string"}
            onChange={(e) =>
              handleTypeChange(index, e.target.value as ColumnConfig["type"])
            }
          >
            <option value="string">String</option>
            <option value="number">Number</option>
            <option value="date">Date</option>
            <option value="boolean">Boolean</option>
          </select>
        </EqualSpace>
      ))}
    </div>
  );
};
