import { particleBackround } from "../Constants/particles";
import { useCallback } from "react";
import { loadSlim } from "tsparticles-slim"
import Particles from "react-particles";

const Particle = () => {

    const particlesInit = useCallback(async engine => {
        await loadSlim(engine);
    }, []);

    const particlesLoaded = useCallback(async container => {
    }, []);

    return (
        <Particles
           id="tsparticels"
           init={particlesInit}
           loaded={particlesLoaded}
           options={particleBackround} />
    );
}

export default Particle;