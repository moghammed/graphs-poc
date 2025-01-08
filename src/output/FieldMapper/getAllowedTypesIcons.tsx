import { Tooltip } from "@mui/material";
import { Slot } from "../GraphTypePicker/GraphTypePicker";
import {
  TextFields,
  Numbers,
  CalendarMonth,
  CheckBox,
  Map as MapIcon,
} from "@mui/icons-material";

export const getAllowedTypesIcons = (slot: Slot) => {
  return slot.allowedTypes
    .map((type) => {
      if (type === "string") {
        return (
          <Tooltip key="string" title="Text">
            <TextFields fontSize="small" />
          </Tooltip>
        );
      }
      if (type === "number") {
        return (
          <Tooltip key="number" title="Number">
            <Numbers fontSize="small" />
          </Tooltip>
        );
      }
      if (type === "date") {
        return (
          <Tooltip key="date" title="Date">
            <CalendarMonth fontSize="small" />
          </Tooltip>
        );
      }
      if (type === "boolean") {
        return (
          <Tooltip key="boolean" title="Boolean">
            <CheckBox fontSize="small" />
          </Tooltip>
        );
      }
      if (type === "geocoordinates") {
        return (
          <Tooltip key="geocoordinates" title="Geocoordinates">
            <MapIcon fontSize="small" />
          </Tooltip>
        );
      }
      return null;
    })
    .filter(Boolean);
};
