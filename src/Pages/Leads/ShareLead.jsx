import React, { useEffect, useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, Slide, Button, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { shareLead } from "../../redux/action/lead";
import { getEmployees } from "../../redux/action/user";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const ShareLeadModal = ({ open, setOpen, currentLead }) => {
  const dispatch = useDispatch();
  const { employees, isFetchingEmployees } = useSelector((state) => state.user);
  const { isSharingLead } = useSelector((state) => state.lead);
  const [shareWith, setShareWith] = useState("");

  useEffect(() => {
    if (employees.length === 0) {
      dispatch(getEmployees());
    }
  }, [dispatch, employees.length]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (shareWith) {
      dispatch(shareLead(currentLead._id, shareWith));
      setOpen(false);
      setShareWith("");
    }
  };

  const handleChange = (e) => {
    setShareWith(e.target.value);
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => setOpen(false)}
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle>Share Lead</DialogTitle>
      {isFetchingEmployees ? (
        <div className="flex justify-center p-4">
          <CircularProgress />
        </div>
      ) : (
        <DialogContent>
          <div className="flex flex-col gap-2 p-3 text-gray-500">
            <div className="pb-4 text-lg">Share with</div>
            <Select
              name="allocatedTo"
              value={shareWith}
              onChange={handleChange}
              fullWidth
              displayEmpty
            >
              {/* <MenuItem value="" disabled>
                Select Employee
              </MenuItem>
              {employees
                .filter((employee) =>
                  currentLead.allocatedTo.every(
                    (allocated) => allocated._id !== employee._id
                  )
                )
                .map((employee) => (
                  <MenuItem value={employee._id} key={employee._id}>
                    {employee.username}
                  </MenuItem>
                ))} */}
            </Select>
          </div>
        </DialogContent>
      )}
      <DialogActions>
        <Button onClick={() => setOpen(false)} color="inherit">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          variant="contained"
          disabled={isSharingLead || !shareWith}
        >
          {isSharingLead ? <CircularProgress size={24} /> : "Share"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ShareLeadModal;
