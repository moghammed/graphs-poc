import { atom, useAtom } from "jotai";
import Papa from "papaparse";
import { ColumnConfig } from "./ColumnConfig";
import { Box, Button, Typography, styled } from "@mui/material";
import { SampleDataGallery } from "./SampleDataGallery";
import { Upload as UploadIcon } from "@mui/icons-material";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const dataAtom = atom<Record<string, any>[]>([]);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const metaAtom = atom<Record<string, any> | null>(null);

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export const Input = ({ next }: { next: () => void }) => {
  const [data, setData] = useAtom(dataAtom);
  const [meta, setMeta] = useAtom(metaAtom);

  const parseFile = (file: File | string) => {
    Papa.parse(file, {
      header: true,
      download: true,
      complete: (results) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setData(results.data as Record<string, any>[]);
        setMeta(results.meta as { fields: string[] });
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
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {data.length < 1 ? (
        <>
          <Box sx={{ mb: 2.5, maxWidth: 600 }}>
            <Typography variant="h4" sx={{ mb: 1, fontWeight: 600 }}>
              Upload a TSV or CSV file and explore your data
            </Typography>
            <Typography>
              This tool will help you explore your data by allowing you to map
              columns to fields, apply filters, and view your data in different
              kinds of graphs.
            </Typography>
          </Box>
          <Button
            component="label"
            variant="contained"
            startIcon={<UploadIcon />}
            sx={{
              mb: 3,
              bgcolor: (theme) => theme.palette.primary.main,
              "&:hover": {
                bgcolor: (theme) => theme.palette.primary.dark,
              },
            }}
          >
            Upload file
            <VisuallyHiddenInput
              type="file"
              onChange={handleFileChange}
              accept=".csv,.tsv"
            />
          </Button>
          <SampleDataGallery parseFile={parseFile} />
        </>
      ) : null}
      {data.length > 0 ? (
        <>
          <ColumnConfig data={data} meta={meta as { fields: string[] }} />
          <Typography sx={{ mt: 7.5 }}>Looks good?</Typography>
          <Button
            variant="contained"
            onClick={next}
            sx={{
              mt: 1,
              bgcolor: (theme) => theme.palette.primary.main,
              color: "white",
              "&:hover": {
                bgcolor: (theme) => theme.palette.primary.dark,
              },
            }}
          >
            Let's see your data in action
          </Button>
        </>
      ) : null}
    </Box>
  );
};
