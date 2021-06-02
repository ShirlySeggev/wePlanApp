import { CgClose } from 'react-icons/cg';

export function ModalHeader({ title, className, closeModal }) {

    return <div className={`modalHeader ${className}`}>
        <div className="modalHeader container">
            <span className="modalHeader title">{title}</span>
            <CgClose className="modalHeader icon" onClick={closeModal} />
        </div>
    </div>
}