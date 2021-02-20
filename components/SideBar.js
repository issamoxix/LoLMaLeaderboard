import styles from "../styles/Sidebar.module.css";
import Link from "next/link";
export default function SideBar() {
  return (
    <nav className={styles.side_nav}>
      <ul>
        <li>
          <Link href="/">
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="42.084"
                height="42.088"
                viewBox="0 0 42.084 42.088"
              >
                <path
                  id="home_1_"
                  data-name="home (1)"
                  d="M40.953,18.306l0,0L23.782,1.135a3.874,3.874,0,0,0-5.48,0L1.142,18.294l-.017.018a3.873,3.873,0,0,0,2.578,6.6q.059.006.119.006h.684V37.553a4.54,4.54,0,0,0,4.535,4.534h6.717a1.233,1.233,0,0,0,1.233-1.233V30.949a2.071,2.071,0,0,1,2.069-2.069h3.962a2.071,2.071,0,0,1,2.069,2.069v9.906a1.233,1.233,0,0,0,1.233,1.233h6.717a4.54,4.54,0,0,0,4.535-4.534V24.919h.635a3.875,3.875,0,0,0,2.742-6.613Zm0,0"
                  transform="translate(0 0.001)"
                  fill="#9f6554"
                />
              </svg>
              <span>Home</span>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/ranking">
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="53.305"
                height="36.251"
                viewBox="0 0 53.305 36.251"
              >
                <g id="ranking" transform="translate(990 -201.592)">
                  <path
                    id="Tracé_9"
                    data-name="Tracé 9"
                    d="M51.27,191.745H47.425V172.133a1.452,1.452,0,0,0-1.451-1.451H34.1v-5.654a1.452,1.452,0,0,0-1.451-1.451H20.659a1.452,1.452,0,0,0-1.451,1.451v5.531a.781.781,0,1,0,1.561,0v-5.421H32.536v26.607H20.769v-17.86a.781.781,0,0,0-1.561,0v2.791H7.33a1.452,1.452,0,0,0-1.451,1.451v13.617H2.036A2.038,2.038,0,0,0,0,193.78v5.267a.78.78,0,0,0,.781.781H52.525a.78.78,0,0,0,.781-.781V193.78A2.038,2.038,0,0,0,51.27,191.745ZM7.44,178.238H19.208v13.507H7.44Zm44.3,20.029H1.561V193.78a.475.475,0,0,1,.475-.475h36.7a.781.781,0,0,0,0-1.561H34.1v-19.5H45.865v19.5H42.058a.781.781,0,0,0,0,1.561H51.27a.475.475,0,0,1,.475.475v4.486Z"
                    transform="translate(-990 38.015)"
                    fill="#9f6554"
                  />
                </g>
              </svg>

              <span>Leaderboard</span>
            </a>
          </Link>
        </li>
        <li>
          <Link href="#">
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="45.996"
                height="51.922"
                viewBox="0 0 45.996 51.922"
              >
                <g id="power" transform="translate(-17.126)">
                  <path
                    id="Tracé_6"
                    data-name="Tracé 6"
                    d="M22.662,41.28A17.49,17.49,0,0,1,33.6,25.081l3.27-6.569a23,23,0,0,0-2.95,44.916l.629-5.6A17.493,17.493,0,0,1,22.662,41.28Z"
                    transform="translate(0 -15.31)"
                    fill="#9f6554"
                  />
                  <path
                    id="Tracé_7"
                    data-name="Tracé 7"
                    d="M188.706,44.248A23.039,23.039,0,0,0,171.913,22.1l-.643,5.593A17.463,17.463,0,0,1,172.339,60.4l-3.361,6.611A23.033,23.033,0,0,0,188.706,44.248Z"
                    transform="translate(-125.583 -18.278)"
                    fill="#9f6554"
                  />
                  <path
                    id="Tracé_8"
                    data-name="Tracé 8"
                    d="M99.586,23.183A1.279,1.279,0,0,0,98.352,21.3H87.831L90.1,1.609a1.46,1.46,0,0,0-.981-1.55,1.408,1.408,0,0,0-.4-.058,1.381,1.381,0,0,0-1.232.768L73.253,29.359a1.507,1.507,0,0,0,.062,1.407,1.469,1.469,0,0,0,1.177.739H84.874l-2.128,18.95a1.312,1.312,0,0,0,.979,1.416,1.369,1.369,0,0,0,.4.05,1.384,1.384,0,0,0,1.234-.757Z"
                    transform="translate(-46.298 0)"
                    fill="#9f6554"
                  />
                </g>
              </svg>

              <span>Champions</span>
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
