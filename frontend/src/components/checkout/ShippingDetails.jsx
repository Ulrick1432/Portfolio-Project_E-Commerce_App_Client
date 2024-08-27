// Shipping Details. At this stage, customers input their shipping address and select their preferred
// shipping method. Businesses should offer multiple shipping options, catering to various needs and
// budgets, and provide accurate delivery estimates.
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const ShippingDetails = () => {
  const [selectedSupplier, setSelectedSupplier] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const nextButton = document.querySelector(".nextButton");
    if (nextButton && selectedSupplier) {
      nextButton.disabled = !selectedSupplier;
    } else {
      nextButton.disabled = false;
    }
    console.log(selectedSupplier)
  }, [selectedSupplier]);

  const handleClickSupplier = () => {
    if (!selectedSupplier) {
      setSelectedSupplier(true);
    } else {
      setSelectedSupplier(false);
    }
  };

  return (
    <div>
      <h2>Shipping details</h2>
      <h3>This page is missing integration delivery supplier sry :D </h3>
      <button onClick={handleClickSupplier}>Postnord</button>
      <button onClick={handleClickSupplier}>GLS</button>
      <br/>
      <button onClick={() => navigate('/checkout/customerInformation')}>Back</button>
      <button className="nextButton" onClick={() => navigate('/checkout')} disabled={!selectedSupplier}>Next</button>
    </div>
  );
};

export default ShippingDetails;