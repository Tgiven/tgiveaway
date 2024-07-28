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

  const CarIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
  </svg>
);

const ProgressBar = ({ status }) => {
  const getProgress = () => {
    switch (status) {
      case 'pending': return '0%';
      case 'intransit': return '50%';
      case 'delivered': return '100%';
      default: return '0%';
    }
  };

  return (
    <div style={{
      width: '100%',
      height: '4px',
      backgroundColor: '#e0e0e0',
      borderRadius: '2px',
      position: 'relative',
      marginBottom: '20px',
    }}>
      <div style={{
        width: getProgress(),
        height: '100%',
        backgroundColor: '#333366',
        borderRadius: '2px',
        transition: 'width 0.5s ease-in-out',
      }}/>
      <div style={{
        position: 'absolute',
        top: '-10px',
        left: getProgress(),
        transform: 'translateX(-50%)',
        transition: 'left 0.5s ease-in-out',
      }}>
        <div className={styles.pulsingCar}>
          <CarIcon />
        </div>
      </div>
    </div>
  );
};

  const renderStatusBar = (currentStatus) => (
  <div>
    <ProgressBar status={currentStatus} />
    <div style={commonStyles.statusBar}>
      <div style={{...commonStyles.statusStep, ...(currentStatus !== 'pending' ? commonStyles.activeStep : commonStyles.inactiveStep)}}>Label Created</div>
      <div style={{...commonStyles.statusStep, ...(currentStatus === 'intransit' || currentStatus === 'on hold' ? commonStyles.activeStep : commonStyles.inactiveStep)}}>In Transit</div>
      <div style={{...commonStyles.statusStep, ...(currentStatus === 'delivered' ? commonStyles.activeStep : commonStyles.inactiveStep)}}>Delivered</div>
    </div>
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
