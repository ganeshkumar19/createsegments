import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Typography,
  Stack,
  Paper,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { saveSegment } from "../services/api";

interface Props {
  onClose: () => void;
}

interface SchemaOption {
  label: string;
  value: string;
}

const schemaOptions: SchemaOption[] = [
  { label: "First Name", value: "first_name" },
  { label: "Last Name", value: "last_name" },
  { label: "Gender", value: "gender" },
  { label: "Age", value: "age" },
  { label: "Account Name", value: "account_name" },
  { label: "City", value: "city" },
  { label: "State", value: "state" },
];

const SegmentModal: React.FC<Props> = ({ onClose }) => {
  const [segmentName, setSegmentName] = useState("");
  const [selectedSchema, setSelectedSchema] = useState("");
  const [addedSchemas, setAddedSchemas] = useState<SchemaOption[]>([]);

  // Filter options that haven't been added yet
  const availableOptions = schemaOptions.filter(
    (opt) => !addedSchemas.some((a) => a.value === opt.value)
  );

  // Add new schema to the list
  const handleAddSchema = () => {
    const schema = schemaOptions.find((s) => s.value === selectedSchema);
    if (schema) {
      setAddedSchemas([...addedSchemas, schema]);
      setSelectedSchema("");
    }
  };

  // Change schema in an existing dropdown
  const handleSchemaChange = (index: number, value: string) => {
    const newSchemas = [...addedSchemas];
    const schema = schemaOptions.find((s) => s.value === value);
    if (schema) {
      newSchemas[index] = schema;
      setAddedSchemas(newSchemas);
    }
  };

  const handleSave = async () => {
    if (!segmentName || addedSchemas.length === 0) {
      alert("Please enter a segment name and add at least one schema.");
      return;
    }

    const data = {
      segment_name: segmentName,
      schema: addedSchemas.map((s) => ({ [s.value]: s.label })),
    };

    try {
      await saveSegment(data);
      alert("Segment saved successfully!");
      onClose();
    } catch (error) {
      alert("Failed to save segment. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bgcolor: "rgba(0,0,0,0.4)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Paper sx={{ p: 4, width: 450, borderRadius: 2 }} elevation={6}>
        <Typography variant="h6" mb={2}>
          Save Segment
        </Typography>

        <TextField
          fullWidth
          label="Segment Name"
          value={segmentName}
          onChange={(e) => setSegmentName(e.target.value)}
          variant="outlined"
          margin="normal"
          sx={{marginBottom: '20px'}}
        />

        <Stack direction="row" spacing={1} alignItems="center" mb={2}>
          <TextField
            select
            label="Add schema to segment"
            value={selectedSchema}
            onChange={(e) => setSelectedSchema(e.target.value)}
            fullWidth
            size="small"
          >
            <MenuItem value="">Select schema</MenuItem>
            {availableOptions.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </TextField>

          <IconButton
            color="primary"
            onClick={handleAddSchema}
            disabled={!selectedSchema}
            sx={{ mt: 1, border: '1px solid black' }}
          >
            <AddIcon />
          </IconButton>
        </Stack>

        {addedSchemas.length > 0 && (
          <Paper
            sx={{ bgcolor: "#e6f0ff", p: 2, borderRadius: 1, mb: 2 }}
            elevation={0}
          >
            <Stack spacing={1}>
              {addedSchemas.map((schema, index) => {
                const remainingOptions = schemaOptions.filter(
                  (opt) =>
                    !addedSchemas
                      .filter((_, i) => i !== index)
                      .some((a) => a.value === opt.value)
                );
                return (
                  <TextField
                    key={index}
                    select
                    size="small"
                    fullWidth
                    value={schema.value}
                    onChange={(e) =>
                      handleSchemaChange(index, e.target.value)
                    }
                  >
                    {remainingOptions.map((opt) => (
                      <MenuItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </MenuItem>
                    ))}
                  </TextField>
                );
              })}
            </Stack>
          </Paper>
        )}

        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save Segment
          </Button>
          <Button variant="outlined" color="secondary" onClick={onClose}>
            Cancel
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default SegmentModal;