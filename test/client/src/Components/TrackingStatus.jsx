import React from "react";
import styles from "../styles/TrackingStatus.module.css";

function TrackingStatus({ status, address, updateTime, name, content, weight, trackingNumber, comment }) {
  let statusDisplay;
  const commonStyles = {
    container: {
      fontFamily: 'Helvetica, Arial, sans-serif',
      maxWidth: '600px',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: '#f7f7f7',
      borderRadius: '8px',
    },
    trackingNumber: {
      fontSize: '1.2em',
      fontWeight: 'bold',
      color: '#333366',
      textAlign: 'center',
      marginBottom: '20px',
      padding: '10px',
      backgroundColor: 'white',
      borderRadius: '5px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    },
    statusBar: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '20px',
    },
    statusStep: {
      flex: 1,
      textAlign: 'center',
    },
    activeStep: {
      color: '#333366',
      fontWeight: 'bold',
    },
    inactiveStep: {
      color: '#999999',
    },
    details: {
      backgroundColor: 'white',
      padding: '15px',
      borderRadius: '5px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    },
    detailsTitle: {
      color: '#333366',
      fontWeight: 'bold',
      marginBottom: '10px',
    },
    detailsText: {
      color: '#333333',
      marginBottom: '5px',
    },
    updateTime: {
      color: '#666666',
      fontSize: '0.9em',
      marginTop: '10px',
    },
    onHoldContainer: {
      backgroundColor: '#FFF3CD',
      border: '1px solid #FFEEBA',
      borderRadius: '5px',
      padding: '15px',
      marginTop: '20px',
    },
    onHoldTitle: {
      color: '#856404',
      fontWeight: 'bold',
      marginBottom: '10px',
    },
    onHoldText: {
      color: '#856404',
    },
  };

  const renderStatusBar = (currentStatus) => (
    <div style={commonStyles.statusBar}>
      <div style={{...commonStyles.statusStep, ...(currentStatus !== 'pending' ? commonStyles.activeStep : commonStyles.inactiveStep)}}>Label Created</div>
      <div style={{...commonStyles.statusStep, ...(currentStatus === 'intransit' || currentStatus === 'on hold' ? commonStyles.activeStep : commonStyles.inactiveStep)}}>In Transit</div>
      <div style={{...commonStyles.statusStep, ...(currentStatus === 'delivered' ? commonStyles.activeStep : commonStyles.inactiveStep)}}>Delivered</div>
    </div>
  );

  const renderDetails = () => (
    <div style={commonStyles.details}>
      <p style={commonStyles.detailsText}>Address: {address}</p>
      <p style={commonStyles.detailsText}>Name: {name}</p>
      <p style={commonStyles.detailsText}>Content: {content}</p>
      <p style={commonStyles.detailsText}>Weight: {weight}</p>
      <p style={commonStyles.updateTime}>Last Update: {updateTime}</p>
    </div>
  );

  if (status === "pending") {
    statusDisplay = (
      <div style={commonStyles.container}>
        <div style={commonStyles.trackingNumber}>
          Tracking Number: {trackingNumber}
        </div>
        {renderStatusBar(status)}
        <div style={commonStyles.details}>
          <p style={commonStyles.detailsTitle}>Label Created, Waiting for Pickup</p>
          {renderDetails()}
        </div>
      </div>
    );
  } else if (status === "intransit") {
    statusDisplay = (
      <div style={commonStyles.container}>
        <div style={commonStyles.trackingNumber}>
          Tracking Number: {trackingNumber}
        </div>
        {renderStatusBar(status)}
        <div style={commonStyles.details}>
          <p style={commonStyles.detailsTitle}>Package in Transit to Destination</p>
          {renderDetails()}
        </div>
      </div>
    );
  } else if (status === "on hold") {
    statusDisplay = (
      <div style={commonStyles.container}>
        <div style={commonStyles.trackingNumber}>
          Tracking Number: {trackingNumber}
        </div>
        {renderStatusBar(status)}
        <div style={commonStyles.details}>
          <p style={commonStyles.detailsTitle}>Package On Hold</p>
          {renderDetails()}
        </div>
        <div style={commonStyles.onHoldContainer}>
          <p style={commonStyles.onHoldTitle}>On Hold Notice</p>
          <p style={commonStyles.onHoldText}>{comment || "Package is currently on hold. We'll update you when it's back in transit."}</p>
        </div>
      </div>
    );
  } else if (status === "delivered") {
    statusDisplay = (
      <div style={commonStyles.container}>
        <div style={commonStyles.trackingNumber}>
          Tracking Number: {trackingNumber}
        </div>
        {renderStatusBar(status)}
        <div style={commonStyles.details}>
          <p style={commonStyles.detailsTitle}>Package Delivered</p>
          {renderDetails()}
        </div>
      </div>
    );
  } else {
    statusDisplay = (
      <div style={commonStyles.container}>
        <div style={commonStyles.trackingNumber}>
          Tracking Number: {trackingNumber}
        </div>
        <p style={{textAlign: 'center'}}>Status unknown</p>
      </div>
    );
  }

  return statusDisplay;
}

export default TrackingStatus;
