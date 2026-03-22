export default function Home() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <p className="font-ict-mono text-xs uppercase tracking-widest text-ict-text-2 mb-3">
          ICT Knowledge
        </p>
        <h1 className="text-2xl font-semibold font-ict-sans text-ict-text-bright mb-2">
          Chọn một bài học để bắt đầu
        </h1>
        <p className="text-sm text-ict-text-2 font-ict-sans">
          Các bài học sẽ được thêm dần khi học kiến thức mới.
        </p>
      </div>
    </div>
  );
}
