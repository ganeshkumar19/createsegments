import React, { useState } from "react";
import SegmentModal from "./components/SegmentModal";
import { Button } from "@mui/material";


const App: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div style={{ padding: "40px" }}>
     <Button
        variant="contained"
        color="primary"
        onClick={() => setShowModal(true)}
      >
        Save Segment
      </Button>

      {showModal && (
        <SegmentModal
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default App;