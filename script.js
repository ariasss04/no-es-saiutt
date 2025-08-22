const students = [
  {
    matricula: "15821",
    nombre: "Manuel Castro",
    documento: 0,
    actividad: 0,
    examen: 0,
    asistencia: 0,
    participacion: 0,
  },
  {
    matricula: "19269",
    nombre: "Angel Arias",
    documento: 0,
    actividad: 0,
    examen: 0,
    asistencia: 0,
    participacion: 0,
  },
  {
    matricula: "20623",
    nombre: "Yahir Perez",
    documento: 0,
    actividad: 0,
    examen: 0,
    asistencia: 0,
    participacion: 0,
  },
  {
    matricula: "20603",
    nombre: "Cesar Escalante",
    documento: 0,
    actividad: 0,
    examen: 0,
    asistencia: 0,
    participacion: 0,
  },
  {
    matricula: "20609",
    nombre: "Sebastian Gonzalez",
    documento: 0,
    actividad: 0,
    examen: 0,
    asistencia: 0,
    participacion: 0,
  },
];

const tbody = document.querySelector("#studentsTable tbody");
const message = document.getElementById("message");

// Función para crear la tabla
function renderTable() {
  tbody.innerHTML = "";
  students.forEach((student) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
          <td>${student.matricula}</td>
          <td>${student.nombre}</td>
          <td><input type="number" min="0" max="10" value="${student.documento}" onchange="updateGrade('${student.matricula}', 'documento', this.value)"></td>
          <td><input type="number" min="0" max="10" value="${student.actividad}" onchange="updateGrade('${student.matricula}', 'actividad', this.value)"></td>
          <td><input type="number" min="0" max="10" value="${student.examen}" onchange="updateGrade('${student.matricula}', 'examen', this.value)"></td>
          <td><input type="number" min="0" max="10" value="${student.asistencia}" onchange="updateGrade('${student.matricula}', 'asistencia', this.value)"></td>
          <td><input type="number" min="0" max="10" value="${student.participacion}" onchange="updateGrade('${student.matricula}', 'participacion', this.value)"></td>
        `;
    tbody.appendChild(tr);
  });
}

// Actualiza el valor de la calificación
function updateGrade(matricula, field, value) {
  const student = students.find((s) => s.matricula === matricula);
  if (student) {
    const val = parseInt(value);
    student[field] = isNaN(val) ? 0 : Math.max(0, Math.min(10, val));
  }
}

// Procesar CSV
document.getElementById("csvFile").addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  if (file.type !== "text/csv") {
    message.textContent = "Error: Solo se permiten archivos CSV.";
    message.style.color = "red";
    return;
  }

  const reader = new FileReader();
  reader.onload = function (event) {
    const text = event.target.result;
    const rows = text.trim().split("\n");
    rows.slice(1).forEach((row) => {
      // omite cabecera
      const [matricula, documento, actividad, examen, asistencia, participacion] = row.split(",");
      const student = students.find((s) => s.matricula === matricula);
      if (student) {
        student.documento = parseInt(documento) || 0;
        student.actividad = parseInt(actividad) || 0;
        student.examen = parseInt(examen) || 0;
        student.asistencia = parseInt(asistencia) || 0;
        student.participacion = parseInt(participacion) || 0;
      }
    });
    renderTable();
    message.textContent = "Archivo CSV cargado correctamente.";
    message.style.color = "green";
  };
  reader.readAsText(file);
});

renderTable();
