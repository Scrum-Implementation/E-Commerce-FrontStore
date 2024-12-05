import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col, Alert, InputGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const DialogEdit = ({ item, onClose, onSave }) => {
  const [productName, setProductName] = useState(item.product_name || '');
  const [category, setCategory] = useState(item.category || '');
  const [description, setDescription] = useState(item.description || '');
  const [availQty, setAvailQty] = useState(item.quantity || 0);
  const [price, setPrice] = useState(item.price || 0);
  const [barcode, setBarcode] = useState(item.barcode || '');
  const [errorMessage, setErrorMessage] = useState('');
  const [touched, setTouched] = useState({
    productName: false,
    category: false,
    availQty: false,
    price: false,
    description: false,
  });

  useEffect(() => {
    if (item) {
      setProductName(item.product_name || '');
      setCategory(item.category || '');
      setDescription(item.description || '');
      setAvailQty(item.quantity || 0);
      setPrice(item.price || 0);
      setBarcode(item.barcode || '');
    }
  }, [item]);

  const handleInputChange = (e, field) => {
    const { value } = e.target;
    if (field === 'productName') setProductName(value);
    if (field === 'category') setCategory(value);
    if (field === 'availQty') setAvailQty(value);
    if (field === 'price') setPrice(value);
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleSave = async () => {
    if (!productName || !category || !availQty || !price || !description) {
      setErrorMessage("All fields are required.");
      return;
    }

    const updatedItem = {
      ...item,
      product_name: productName,
      category,
      description,
      quantity: parseInt(availQty),
      price: parseFloat(price),
      barcode, 
    };

    try {
      await onSave(updatedItem);
      onClose();
    } catch (error) {
      setErrorMessage("Error updating product. Please try again.");
    }
  };

  return (
    <Modal show={true} onHide={onClose} centered size="lg" backdrop="static">
      <Modal.Header>
        <Modal.Title>Edit Product</Modal.Title>
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
                  placeholder="Barcode"
                  value={barcode}
                  disabled
                />
              </Form.Group>

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

              <Form.Group controlId="price" className="mb-4">
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

            <Col md={6}>
              <Form.Group controlId="category" className="mb-4">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Category"
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

              <Form.Group controlId="description" className="mb-4">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={6}
                  placeholder="Add Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  onBlur={() => setTouched(prev => ({ ...prev, description: true }))}
                  isInvalid={touched.description && !description}
                  isValid={description && touched.description}
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
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
        <Button variant="success" onClick={handleSave}>Update</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DialogEdit;