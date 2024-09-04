export function findColorCodefev1_fvc(value) {
    if (value >= 70) {
      return "success";
    }
    if (value >= 60 && value <= 69) {
      return "yellow";
    }
    if (value < 60) {
      return "danger";
    }
    return ;
  }