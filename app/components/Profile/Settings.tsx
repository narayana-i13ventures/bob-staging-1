import React, { useState } from "react";
import {
  Switch,
  FormControlLabel,
  FormGroup,
  Divider,
  Typography,
  Button,
} from "@mui/material";

const Settings = () => {
  // State for email notifications
  const [boardActivity, setBoardActivity] = useState(false);
  const [boardSharedWithMe, setBoardSharedWithMe] = useState(false);
  const [boardSharedWithTeam, setBoardSharedWithTeam] = useState(false);
  const [requestAccessToBoard, setRequestAccessToBoard] = useState(false);
  const [mentionsInComments, setMentionsInComments] = useState(false);
  const [summaryOfChanges, setSummaryOfChanges] = useState(false);

  // State for project and team activity
  const [addsMeToProject, setAddsMeToProject] = useState(false);
  const [inviteesSignUp, setInviteesSignUp] = useState(false);
  const [requestAccessToTeam, setRequestAccessToTeam] = useState(false);
  const [invitesMeToTeam, setInvitesMeToTeam] = useState(false);
  const [weeklySummaryOfTeamActivity, setWeeklySummaryOfTeamActivity] =
    useState(false);

  // State for other email updates
  const [tipsAndHowTos, setTipsAndHowTos] = useState(false);
  const [productFeatureUpdates, setProductFeatureUpdates] = useState(false);
  const [eventsAndPromotions, setEventsAndPromotions] = useState(false);
  const [surveysAndProductTesting, setSurveysAndProductTesting] =
    useState(false);
  const [unsubscribeAll, setUnsubscribeAll] = useState(false);

  // Function to handle changes in "Unsubscribe All" switch
  const handleUnsubscribeAllChange = () => {
    setUnsubscribeAll(!unsubscribeAll);
    // Update all other switches based on the state of "Unsubscribe All"
    setBoardActivity(!unsubscribeAll);
    setBoardSharedWithMe(!unsubscribeAll);
    setBoardSharedWithTeam(!unsubscribeAll);
    setRequestAccessToBoard(!unsubscribeAll);
    setMentionsInComments(!unsubscribeAll);
    setSummaryOfChanges(!unsubscribeAll);
    setAddsMeToProject(!unsubscribeAll);
    setInviteesSignUp(!unsubscribeAll);
    setRequestAccessToTeam(!unsubscribeAll);
    setInvitesMeToTeam(!unsubscribeAll);
    setWeeklySummaryOfTeamActivity(!unsubscribeAll);
    setTipsAndHowTos(!unsubscribeAll);
    setProductFeatureUpdates(!unsubscribeAll);
    setEventsAndPromotions(!unsubscribeAll);
    setSurveysAndProductTesting(!unsubscribeAll);
  };
  return (
    <div>
      <Typography variant="h6" sx={{ fontWeight: 600 }}>
        Notification Settings
      </Typography>
      <Divider sx={{ my: 2 }} />

      {/* Email Notifications */}
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={boardActivity}
              onChange={() => setBoardActivity(!boardActivity)}
            />
          }
          label="Board activity & conversation"
        />

        <FormControlLabel
          control={
            <Switch
              checked={boardSharedWithMe}
              onChange={() => setBoardSharedWithMe(!boardSharedWithMe)}
            />
          }
          label="When a board is shared with me"
        />

        <FormControlLabel
          control={
            <Switch
              checked={boardSharedWithTeam}
              onChange={() => setBoardSharedWithTeam(!boardSharedWithTeam)}
            />
          }
          label="When a board is shared with a team"
        />

        <FormControlLabel
          control={
            <Switch
              checked={requestAccessToBoard}
              onChange={() => setRequestAccessToBoard(!requestAccessToBoard)}
            />
          }
          label="When someone requests access to my board"
        />

        <FormControlLabel
          control={
            <Switch
              checked={mentionsInComments}
              onChange={() => setMentionsInComments(!mentionsInComments)}
            />
          }
          label="When someone @mentions me in any comments"
        />

        <FormControlLabel
          control={
            <Switch
              checked={summaryOfChanges}
              onChange={() => setSummaryOfChanges(!summaryOfChanges)}
            />
          }
          label="Summary of changes on my boards"
        />
      </FormGroup>

      {/* Project and Team Activity */}
      <Typography sx={{ fontWeight: 600, mt: 2 }}>
        Project & Team Activity Settings
      </Typography>
      <Divider sx={{ my: 2 }} />

      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={addsMeToProject}
              onChange={() => setAddsMeToProject(!addsMeToProject)}
            />
          }
          label="When someone adds me to a project"
        />

        <FormControlLabel
          control={
            <Switch
              checked={inviteesSignUp}
              onChange={() => setInviteesSignUp(!inviteesSignUp)}
            />
          }
          label="When my invitees sign up"
        />

        <FormControlLabel
          control={
            <Switch
              checked={requestAccessToTeam}
              onChange={() => setRequestAccessToTeam(!requestAccessToTeam)}
            />
          }
          label="When someone requests access to my team"
        />

        <FormControlLabel
          control={
            <Switch
              checked={invitesMeToTeam}
              onChange={() => setInvitesMeToTeam(!invitesMeToTeam)}
            />
          }
          label="When someone invites me to a team"
        />

        <FormControlLabel
          control={
            <Switch
              checked={weeklySummaryOfTeamActivity}
              onChange={() =>
                setWeeklySummaryOfTeamActivity(!weeklySummaryOfTeamActivity)
              }
            />
          }
          label="Weekly summary of team activity"
        />
      </FormGroup>

      {/* Other Email Updates */}
      <Typography sx={{ fontWeight: 600, mt: 2 }}>
        Other Email Updates
      </Typography>
      <Divider sx={{ my: 2 }} />

      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={tipsAndHowTos}
              onChange={() => setTipsAndHowTos(!tipsAndHowTos)}
            />
          }
          label="Tips & how-tos on using Miro"
        />

        <FormControlLabel
          control={
            <Switch
              checked={productFeatureUpdates}
              onChange={() => setProductFeatureUpdates(!productFeatureUpdates)}
            />
          }
          label="Product & feature updates"
        />

        <FormControlLabel
          control={
            <Switch
              checked={eventsAndPromotions}
              onChange={() => setEventsAndPromotions(!eventsAndPromotions)}
            />
          }
          label="Events & promotions"
        />

        <FormControlLabel
          control={
            <Switch
              checked={surveysAndProductTesting}
              onChange={() =>
                setSurveysAndProductTesting(!surveysAndProductTesting)
              }
            />
          }
          label="Surveys & product testing"
        />
      </FormGroup>

      {/* Unsubscribe Section */}
      <Divider sx={{ my: 4 }} />
      {/* <FormControlLabel
        control={
          <Switch
            checked={unsubscribeAll}
            onChange={handleUnsubscribeAllChange}
          />
        }
        label="Unsubscribe All"
      /> */}
      <Button
        size="small"
        variant="outlined"
        color="error"
        onClick={handleUnsubscribeAllChange}
      >
        Unsubscribe All
      </Button>
      <Typography variant="caption" sx={{ pb: 5, pt: 3, display: "block" }}>
        Please note: you'll still receive important administrative emails, such
        as password resets.
      </Typography>
    </div>
  );
};

export default Settings;
