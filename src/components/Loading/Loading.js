import useLockBodyScroll from "../../hooks/useLockBodyScroll";
function Loading() {
  useLockBodyScroll();
  return (
    <div className="fixed flex justify-center items-center top-0 right-0 left-0 bottom-0 bg-[rgba(0,0,0,0.4)] z-40">
      <div class="sk-cube-grid">
        <div class="sk-cube sk-cube1"></div>
        <div class="sk-cube sk-cube2"></div>
        <div class="sk-cube sk-cube3"></div>
        <div class="sk-cube sk-cube4"></div>
        <div class="sk-cube sk-cube5"></div>
        <div class="sk-cube sk-cube6"></div>
        <div class="sk-cube sk-cube7"></div>
        <div class="sk-cube sk-cube8"></div>
        <div class="sk-cube sk-cube9"></div>
      </div>
    </div>
  );
}

export default Loading;
