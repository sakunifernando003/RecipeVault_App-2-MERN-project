import React from 'react'

export default function Modal({children,onClose}) {
  return (
    <>
        <div className='backdrop'onClick={onClose}>
            <dialog className='modal' open>
                {children}

            </dialog>

        </div>
    </>
  )
}
