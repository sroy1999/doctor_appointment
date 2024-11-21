import React from 'react';
import LazyImage from '../../components/LazyImage';
import { assets } from '../../assets/assets';

const addDoctor = () => {
  return (
    <form>
      <p>Add doctor</p>
      <div>
        <div>
          <label htmlFor="doc-image">
            <LazyImage src={assets.upload_area} />
          </label>
          <input type="file" id="doc-image" hidden />
          <p>Upload picture</p>
        </div>
        <div>
          <div>
            <div>
              <p>Name</p>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

export default addDoctor;