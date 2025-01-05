import styled from "@emotion/styled";

import { atom, useAtom } from "jotai";
import Papa from "papaparse";
import { useState } from "react";
import { ColumnConfig } from "./ColumnConfig";

export const dataAtom = atom<any[]>([]);
export const metaAtom = atom<any>(null);

export const Input = () => {
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useAtom(dataAtom);
  const [meta, setMeta] = useAtom(metaAtom);

  const handleParse = () => {
    if (!file) return;
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        setData(results.data);
        setMeta(results.meta);
      },
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleParse}>Parse</button>
      {data.length > 0 ? <ColumnConfig data={data} meta={meta} /> : null}
    </div>
  );
};
