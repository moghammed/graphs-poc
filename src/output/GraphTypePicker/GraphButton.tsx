import { Button } from "@mui/material";
import { GraphType } from "./GraphTypePicker";
import { useAtom } from "jotai";
import { GraphTypeAtom } from "..";

export const GraphButton = ({ graphType }: { graphType: GraphType }) => {
  const [selectedGraphType, setGraphType] = useAtom(GraphTypeAtom);

  const handleClick = () => {
    setGraphType(graphType);
  };

  return (
    <Button
      variant="contained"
      onClick={handleClick}
      color={selectedGraphType?.id === graphType.id ? "primary" : "inherit"}
      sx={{
        minWidth: 120,
        "&:hover": {
          backgroundColor: (theme) =>
            selectedGraphType?.id === graphType.id
              ? theme.palette.primary.dark
              : theme.palette.grey[300],
        },
      }}
    >
      {graphType.name}
    </Button>
  );
};
