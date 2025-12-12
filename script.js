$(document).ready(function () {
  function showError($input, $errorEl, message) {
    $input.css("border-color", "red");
    $errorEl.text(message).removeClass("d-none");
  }

  function clearError($input, $errorEl) {
    $input.css("border-color", "");
    $errorEl.text("").addClass("d-none");
  }

  function isEmpty(value) {
    return !value || value.trim() === "";
  }

  function validateRequiredField(inputId, errorId) {
    const $input = $("#" + inputId);
    const $error = $("#" + errorId);

    if (isEmpty($input.val())) {
      showError($input, $error, "this filed must not be empty");
      return false;
    }

    clearError($input, $error);
    return true;
  }

  function validateTopics() {
    const $topicError = $("#topicError");
    const checkedCount = $(".topic:checked").length;

    if (checkedCount < 1) {
      $topicError.text("At least one topic must be selected").removeClass("d-none");
      return false;
    }

    $topicError.text("").addClass("d-none");
    return true;
  }

  function validateGender() {
    const $gender = $("#gender");
    const $genderError = $("#genderError");

    if ($gender.val() === "--") {
      $genderError.text("please choose your gender").removeClass("d-none");
      return false;
    }

    $genderError.text("").addClass("d-none");
    return true;
  }

  function validateConfirmPasswordMatch() {
    const $pw = $("#password");
    const $cpw = $("#confirmPassword");
    const $cpwError = $("#confirmPasswordError");

    if (isEmpty($cpw.val())) return false;

    if ($cpw.val() !== $pw.val()) {
      showError($cpw, $cpwError, "confirmed password mismatched the password");
      return false;
    }

    clearError($cpw, $cpwError);
    return true;
  }

  $("#username, #email, #password, #confirmPassword").on("keyup", function () {
    const id = $(this).prop("id");
    if (id === "username") clearError($("#username"), $("#usernameError"));
    if (id === "email") clearError($("#email"), $("#emailError"));
    if (id === "password") clearError($("#password"), $("#passwordError"));
    if (id === "confirmPassword") clearError($("#confirmPassword"), $("#confirmPasswordError"));
  });

  $(".topic").on("change", function () {
    $("#topicError").text("").addClass("d-none");
  });

  $("#gender").on("change", function () {
    $("#genderError").text("").addClass("d-none");
  });

  $("#submitBtn").on("click", function (event) {
    event.preventDefault(); 

    const okUsername = validateRequiredField("username", "usernameError");
    const okEmail = validateRequiredField("email", "emailError");
    const okPassword = validateRequiredField("password", "passwordError");
    const okConfirm = validateRequiredField("confirmPassword", "confirmPasswordError");

    const okTopics = validateTopics();
    const okGender = validateGender();

    let okMatch = true;
    if (okPassword && okConfirm) {
      okMatch = validateConfirmPasswordMatch();
    }

    const isValid = okUsername && okEmail && okPassword && okConfirm && okTopics && okGender && okMatch;

    if (isValid) {
      alert("Form submitted successfully!");
    }
  });
});