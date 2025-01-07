import { Slot } from "../GraphTypePicker/GraphTypePicker";
import { useRef, useState } from "react";
import { Tooltip } from "../../components/Tooltip";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Stack,
  Tooltip as MuiTooltip,
} from "@mui/material";
import {
  CalendarMonth as MdCalendarMonth,
  CheckBox as MdCheckBox,
  Clear as MdClear,
  Numbers as MdNumbers,
  QuestionMark as MdQuestionMark,
  TextFields as MdTextFields,
} from "@mui/icons-material";
import { SlotDropZone } from "./SlotDropZone";

export const getAllowedTypesIcons = (slot: Slot) => {
  return slot.allowedTypes
    .map((type) => {
      if (type === "string") {
        return (
          <MuiTooltip key="string" title="Text">
            <MdTextFields fontSize="small" />
          </MuiTooltip>
        );
      }
      if (type === "number") {
        return (
          <MuiTooltip key="number" title="Number">
            <MdNumbers fontSize="small" />
          </MuiTooltip>
        );
      }
      if (type === "date") {
        return (
          <MuiTooltip key="date" title="Date">
            <MdCalendarMonth fontSize="small" />
          </MuiTooltip>
        );
      }
      if (type === "boolean") {
        return (
          <MuiTooltip key="boolean" title="Boolean">
            <MdCheckBox fontSize="small" />
          </MuiTooltip>
        );
      }
      return null;
    })
    .filter(Boolean);
};

export const SlotCard = ({ slot }: { slot: Slot }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const questionMarkRef = useRef<HTMLDivElement>(null);

  return (
    <Card sx={{ minWidth: 200, maxWidth: "sm" }}>
      <CardHeader
        title={slot.name}
        action={
          <Stack direction="row" spacing={1} alignItems="center">
            <Box
              ref={questionMarkRef}
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              <IconButton size="small">
                <MdQuestionMark />
              </IconButton>
            </Box>
          </Stack>
        }
      />
      <CardContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
          }}
        >
          <SlotDropZone slot={slot} />
        </Box>
      </CardContent>
      {showTooltip && (
        <Tooltip anchorEl={questionMarkRef.current}>{slot.description}</Tooltip>
      )}
    </Card>
  );
};
