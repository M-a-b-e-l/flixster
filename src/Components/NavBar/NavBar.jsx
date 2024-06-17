import './NavBar.css'

const NavBar = () => {
    // let slideSearch = document.querySelector(".searchContainer");

    // function showBar() {
    //     slideSearch.style.display = "block";
    return (
        <div>
            <nav className="navBar">
                <ul>
                    <a className = "nav-link nav-deco" href="#">Now Playing</a>
                    {/* <a onClick="showBar()" className = "nav-link nav-deco" href="#">Search</a> */}
                    {/* <a href="#">Contact</a> */}
                </ul>
            </nav>
        </div>
    )
}

export default NavBar
