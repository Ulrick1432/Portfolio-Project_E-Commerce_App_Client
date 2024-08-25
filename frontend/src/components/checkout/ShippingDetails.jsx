// Shipping Details. At this stage, customers input their shipping address and select their preferred
// shipping method. Businesses should offer multiple shipping options, catering to various needs and
// budgets, and provide accurate delivery estimates.
import { useState, useEffect } from "react";


const ShippingDetails = () => {
  const [selectedSupplier, setSelectedSupplier] = useState(false);

  useEffect(() => {
    if (selectedSupplier) {
      document.getElementsByClassName("nextButton").removeAttribute('disabled')
    }
  }, [setSelectedSupplier])

  return (
    <div>
      <h2>Shipping details</h2>
      <h3>This page is missing integration delivery supplier sry :D </h3>
      <p>Postnord</p>
      <p>GLS</p>
      <button>Back</button>
      <button className="nextButton" disabled>Next</button>
    </div>
  )
}

export default ShippingDetails;