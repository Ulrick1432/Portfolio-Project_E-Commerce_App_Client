// Customer Information. Customers are prompted to enter personal information such as name,
// email address, and phone number. This data is essential for order processing, communication, and
// marketing purposes. A streamlined login or guest checkout option for returning customers can
// save time and enhance the user experience.

import { Form, useNavigate } from "react-router-dom"

const CustomerInformation = () => {
  const navigate = useNavigate();
  return (
    <div id="customerInformationPage">
      <h2>Customer information</h2>
      <Form className="customerInformationForm" method="POST" action="toTheAPI XD">

        <label htmlFor="firstName" >
          <input type="text" name="firstName"/>
        </label>
        <br/>

        <label htmlFor="lastName">
          <input type="text" name="lastName"/>
        </label>
        <br/>

        <label htmlFor="phoneNumber">
          <input type="tel" name="phoneNumber"/>
        </label>
        <br/>

        <label htmlFor="email">
          <input type="email" name="email"/>
        </label>
        <br/>

        <label htmlFor="address_line_1">
          <input type="text" name="address_line_1"/>
        </label>
        <br/>

        <label htmlFor="postalCode">
          <input type="number" name="postalCode"/>
        </label>
        <br/>

        <label htmlFor="city">
         <input type="text" name="city"/>
        </label>
        <br/>

        <label htmlFor="country">
          <input type="text" name="country"/>
        </label>
        <br/>

      </Form>
      {/*Onclick back skal navigate til cart onclick next skal navigate til fx /Shipping_details*/}
      <button onClick={() => navigate('/cart')}>Back</button>
      <button onClick={() => navigate('/checkout/shippingDetails')}>Next</button>
    </div>
  )
}

  // request is An object containing the HTTP request data, including form data.
export const customerInfoAction = async ({ request }) => {
  // Exstracts form data
  const data = await request.formData();

  const submission = {
    firstName: data.get('firstName'),
    lastName: data.get('lastName'),
    phoneNumber: data.get('phoneNumber'),
    email: data.get('email'),
    addressLineOne: data.get('address_line_1'),
    postalCode: data.get('postalCode'),
    city: data.get('city'),
    country: data.get('country')
  }

  // Send post request to database via server
  //...

}

export default CustomerInformation;