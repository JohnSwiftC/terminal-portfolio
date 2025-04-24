const FileViewer = ({ content }) => {
    return (
      <pre className="bg-gray-900 text-gray-200 p-3 font-mono overflow-auto h-full whitespace-pre-wrap">
        {content}
      </pre>
    );
  };

  export default FileViewer;