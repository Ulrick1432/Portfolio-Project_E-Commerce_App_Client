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

        <label htmlFor="firstName" > First name</label>
          <input type="text" name="firstName" required/>
        <br/>

        <label htmlFor="lastName">Last name</label>
          <input type="text" name="lastName" required/>
        <br/>

        <label htmlFor="phoneNumber">Phone number</label>
          <input type="tel" name="phoneNumber" required/>
        <br/>

        <label htmlFor="email">E-mail </label>
          <input type="email" name="email" required/>
        <br/>

        <label htmlFor="address_line_1">Street Adress</label>
          <input type="text" name="address_line_1" required/>
        <br/>

        <label htmlFor="postalCode">Postal Code</label>
          <input type="number" name="postalCode" required/>
        <br/>

        <label htmlFor="city">City</label>
         <input type="text" name="city"/>
        <br/>

        <label htmlFor="country">Country</label>
          <input type="text" name="country"/>
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