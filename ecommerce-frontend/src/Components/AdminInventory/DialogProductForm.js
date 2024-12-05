import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col, Alert, InputGroup } from 'react-bootstrap';

const DialogProductForm = ({ show, onClose, onAddProduct }) => {
  const [barcode, setBarcode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [availQty, setAvailQty] = useState('');
  const [price, setPrice] = useState('');

  const [touched, setTouched] = useState({
    productName: false,
    category: false,
    availQty: false,
    price: false,
    barcode: false,
    productDescription: false,
  });

  // Function to reset all form fields
  const resetForm = () => {
    setBarcode('');
    setProductName('');
    setCategory('');
    setProductDescription('');
    setAvailQty('');
    setPrice('');
    setErrorMessage('');
    setTouched({
      productName: false,
      category: false,
      availQty: false,
      price: false,
      barcode: false,
      productDescription: false,
    });
  };

  useEffect(() => {
    if (!show) {
      resetForm();
    }
  }, [show]); 

  const handleInputChange = (e, field) => {
    const { value } = e.target;
    if (field === 'productName') setProductName(value);
    if (field === 'category') setCategory(value);
    if (field === 'availQty') setAvailQty(value);
    if (field === 'price') setPrice(value);
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleBarcodeChange = (e) => {
    const value = e.target.value.slice(0, 18).replace(/[^a-zA-Z0-9]/g, '');
    setBarcode(value);
    setTouched(prev => ({ ...prev, barcode: true }));
  };

  const handleAddProduct = async () => {
    if (!productName || !category || !availQty || !price || !barcode || !productDescription) {
      setErrorMessage("All fields are required.");
      return;
    }

    const newProduct = {
      product_name: productName,
      category,
      description: productDescription,
      quantity: parseInt(availQty),
      price: parseFloat(price),
      barcode,
    };

    try {
      await onAddProduct(newProduct);
      resetForm();
      onClose();
    } catch (error) {
      setErrorMessage("Error adding product. Please try again.");
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered size="lg" backdrop="static">
      <Modal.Header>
        <Modal.Title>Add Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorMessage && (
          <Alert variant="danger" className="d-flex align-items-center">
            <i className="bi bi-exclamation-circle me-2"></i>
            <strong>Error!</strong> {errorMessage}
          </Alert>
        )}
        <Form noValidate>
          <Row>
            <Col md={6}>
              <Form.Group controlId="productName" className="mb-4">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Product Name"
                  value={productName}
                  onChange={(e) => handleInputChange(e, 'productName')}
                  onBlur={() => setTouched(prev => ({ ...prev, productName: true }))} 
                  isInvalid={touched.productName && !productName}
                  isValid={productName && touched.productName}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a product name.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="barcode" className="mb-4">
                <Form.Label>Barcode</Form.Label>
                <Form.Control
                  type="text"
                  value={barcode}
                  onChange={handleBarcodeChange}
                  onBlur={() => setTouched(prev => ({ ...prev, barcode: true }))} 
                  placeholder="Enter your barcode"
                  required
                  isInvalid={touched.barcode && !barcode}
                  isValid={barcode && touched.barcode}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a barcode.
                </Form.Control.Feedback>
              </Form.Group>

              <Row>
                <Col>
                  <Form.Group controlId="availQty" className="mb-4">
                    <Form.Label>Available Quantity</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Available Quantity"
                      value={availQty}
                      onChange={(e) => handleInputChange(e, 'availQty')}
                      onBlur={() => setTouched(prev => ({ ...prev, availQty: true }))} 
                      isInvalid={touched.availQty && !availQty}
                      isValid={availQty && touched.availQty}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid quantity.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId="price" className="mb-3">
                    <Form.Label>Price</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>₱</InputGroup.Text>
                      <Form.Control
                        type="number"
                        placeholder="Price"
                        value={price}
                        onChange={(e) => handleInputChange(e, 'price')}
                        onBlur={() => setTouched(prev => ({ ...prev, price: true }))} 
                        isInvalid={touched.price && !price}
                        isValid={price && touched.price}
                      />
                    </InputGroup>
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid price.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
            </Col>

            <Col md={6}>
              <Form.Group controlId="category" className="mb-4">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Category"
                  value={category}
                  onChange={(e) => handleInputChange(e, 'category')}
                  onBlur={() => setTouched(prev => ({ ...prev, category: true }))} 
                  isInvalid={touched.category && !category}
                  isValid={category && touched.category}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a category.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="productDescription" className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={9}
                  placeholder="Add Description"
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                  onBlur={() => setTouched(prev => ({ ...prev, productDescription: true }))} 
                  isInvalid={touched.productDescription && !productDescription}
                  isValid={productDescription && touched.productDescription}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a product description.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="success" onClick={handleAddProduct}>
          Add Product
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DialogProductForm;