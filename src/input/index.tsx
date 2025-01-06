import { atom, useAtom } from "jotai";
import Papa from "papaparse";
import { ColumnConfig } from "./ColumnConfig";
import styled from "@emotion/styled";
import { SampleDataGallery } from "./SampleDataGallery";

export const dataAtom = atom<any[]>([]);
export const metaAtom = atom<any>(null);

const ExplanationContainer = styled.div`
  margin-bottom: 20px;
  max-width: 600px;

  h1 {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 1em;
  }
`;

const NextStepButton = styled.button`
  margin-top: 20px;
  background-color: #0070f3;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
`;

export const Input = ({ next }: { next: () => void }) => {
  const [data, setData] = useAtom(dataAtom);
  const [meta, setMeta] = useAtom(metaAtom);

  const parseFile = (file: File | string) => {
    Papa.parse(file, {
      header: true,
      download: true,
      complete: (results) => {
        setData(results.data);
        setMeta(results.meta);
      },
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      parseFile(file);
    }
  };

  return (
    <div>
      {data.length < 1 ? (
        <>
          <ExplanationContainer>
            <h1>Upload a TSV or CSV file and explore your data</h1>
            <p>
              This tool will help you explore your data by allowing you to map
              columns to fields, apply filters, and view your data in different
              kinds of graphs.
            </p>
          </ExplanationContainer>
          <input type="file" onChange={handleFileChange} />
          <SampleDataGallery parseFile={parseFile} />
        </>
      ) : null}
      {data.length > 0 ? (
        <>
          <ColumnConfig data={data} meta={meta} />
          <p style={{ marginTop: "60px" }}>All done?</p>
          <NextStepButton onClick={next}>
            Let's see your data in action
          </NextStepButton>
        </>
      ) : null}
    </div>
  );
};
