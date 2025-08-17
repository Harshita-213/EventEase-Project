import { QRCodeCanvas } from 'qrcode.react';

export default function TicketQR({ code }) {
  if (!code) return null;
  return (
    <div className="card" style={{textAlign:'center'}}>
      <h3>Your Ticket</h3>
      <p>Show this QR at entry</p>
      <div style={{display:'inline-block', padding:12, background:'#0f1422', borderRadius:12}}>
        <QRCodeCanvas value={code} size={180} includeMargin />
      </div>
      <p style={{marginTop:8, fontFamily:'monospace'}}>{code}</p>
    </div>
  );
}
