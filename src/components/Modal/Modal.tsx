interface Link {
  link: string;
}

const Modal = ({ link }: Link) => {
  return (
    <div>
      <h1>{link} 123</h1>
    </div>
  );
};

export default Modal;
