import { FrownTwoTone, MehTwoTone, SmileTwoTone } from '@ant-design/icons';
import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { FormFooter } from '../Schedule/styles';

function AddReviewForm() {
  return (
    <Form>
      <Form.Group as={Row} className="mb-3" controlId="tripTitle">
        <Form.Label column sm={2}>
          후기 제목
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="text" required />
        </Col>
      </Form.Group>
      <fieldset>
        <Form.Group as={Row} className="mb-3">
          <Form.Label as="legend" column sm={2}>
            여행 표정
          </Form.Label>
          <Col sm={10} className="mt-1">
            <Form.Check
              type="radio"
              inline="true"
              label={
                <SmileTwoTone
                  style={{
                    fontSize: '30px',
                  }}
                  twoToneColor="#26b820"
                />
              }
              name="tripTypes"
              id="alone"
            />
            <Form.Check
              type="radio"
              inline="true"
              label={
                <MehTwoTone
                  style={{
                    fontSize: '30px',
                  }}
                  twoToneColor="#e4af00"
                />
              }
              name="tripTypes"
              id="family"
            />
            <Form.Check
              type="radio"
              inline="true"
              label={
                <FrownTwoTone
                  style={{
                    fontSize: '30px',
                  }}
                  twoToneColor="#e93600"
                />
              }
              name="tripTypes"
              id="friends"
            />
          </Col>
        </Form.Group>
      </fieldset>

      <Form.Group as={Row} className="mb-3" controlId="picture">
        <Form.Label column sm={2}>
          사진 첨부 (선택)
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="file" />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="review">
        <Form.Label column sm={2}>
          여행 후기
        </Form.Label>
        <Col sm={10}>
          <Form.Control as="textarea" style={{ height: '120px' }} />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="review">
        <Form.Label column sm={2}>
          공개 여부 (선택)
        </Form.Label>
        <Col sm={10}>
          <Form.Check
            type="checkbox"
            id="custom-switch"
            label="스토리 공개(사진 첨부시 선택 가능합니다)"
            style={{ marginTop: '8px' }}
          />
        </Col>
      </Form.Group>

      <FormFooter>
        {/* <p>{submitError && submitError}</p> */}
        <div>
          <Button variant="secondary">Close</Button>
          <Button variant="primary" type="submit">
            작성하기
          </Button>
        </div>
      </FormFooter>

      {/* <Button variant="primary" type="submit">
        Submit
      </Button> */}
    </Form>
  );
}

export default AddReviewForm;
