import radis
from flask import Flask, request
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

app = Flask(__name__)
CORS(app)
limiter = Limiter(
    app,
    key_func=get_remote_address,
)


@app.route("/calc-spectrum")
@limiter.limit("1/second")
def call_calc_spectrum():
    # If too many requests happen at once, RADIS will segfault!
    molecule = request.args["molecule"]
    spectrum = radis.calc_spectrum(
        1900,
        2300,
        molecule=molecule,
        isotope="1,2,3",
        pressure=1.01325,
        Tgas=700,
        mole_fraction=0.1,
        path_length=1,
    )
    wunit = spectrum.get_waveunit()
    var = "radiance_noslit"
    iunit = "default"
    x, y = spectrum.get(var, wunit=wunit, Iunit=iunit)
    return {"x": list(x), "y": list(y), "title": f"Spectrum for {molecule}"}


if __name__ == "__main__":
    app.run()
