import { motion, AnimatePresence } from "framer-motion";

export default function Layout(props) {
  return (
    <AnimatePresence>
      <motion.div
        id="page-content"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 20 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 2.5 }}
        className="container overflow-hidden"
        style={{ paddingTop: "200px" }}
      >
        {props.children}

        <div className="text-center mt-5 py-5" id="footer">
          Built with ❤️ by
          <br /> <span className="fw-bold">We Sigma</span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
