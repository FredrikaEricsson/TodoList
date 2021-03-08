const nextPage = (req, res) => {
  let sorted = parseInt(req.params.sorted);
  const next = parseInt(req.params.page) + 1;
  res.redirect("/?page=" + next + "&sorted=" + sorted);
};

const previousPage = (req, res) => {
  let sorted = parseInt(req.params.sorted);
  const previous = parseInt(req.params.page) - 1;
  res.redirect("/?page=" + previous + "&sorted=" + sorted);
};

const sortTodos = (req, res) => {
  let page = parseInt(req.params.page);
  let sorted = parseInt(req.params.sorted);
  if (sorted === -1) {
    sorted = 1;
  } else {
    sorted = -1;
  }
  res.redirect("/?page=" + page + "&sorted=" + sorted);
};

module.exports = {
  nextPage,
  previousPage,
  sortTodos,
};
