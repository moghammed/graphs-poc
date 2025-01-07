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
} from "@mui/material";
import {
  QuestionMark as MdQuestionMark,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import { SlotDropZone } from "./SlotDropZone";
import { Settings } from "./Settings";
// import { AggregationConfiguration } from "./AggregationConfiguration";

export const SlotCard = ({ slot }: { slot: Slot }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const questionMarkRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);
  return (
    <Card sx={{ minWidth: 200, maxWidth: "sm" }}>
      <CardHeader
        title={slot.name}
        action={
          <Stack direction="row" spacing={1} alignItems="center">
            <Box ref={settingsRef}>
              <IconButton size="small" onClick={() => setShowSettings(true)}>
                <SettingsIcon />
              </IconButton>
            </Box>
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
      {showSettings && (
        <Settings
          slot={slot}
          anchorEl={settingsRef.current}
          close={() => setShowSettings(false)}
        />
      )}
    </Card>
  );
};
